const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
const Destination = require("./destination");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
const fs = require("fs");

//----------------------------------------- END OF IMPORTS---------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

mongoose.connect(
  "mongodb://localhost:27017/tourists",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

function authenticate(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.use((req, res, next) => {
  console.log(req.url + ": ");
  console.log(req.body);
  next();
});

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ username: user.username });
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  console.log("new user");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) throw err("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.post("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

app.get("/user", (req, res) => {
  if (req.user) res.send({user: { username: req.user.username }});
  else res.send({});
});
//----------------------------------------- END OF Auth---------------------------------------------------//

//----------------------------------------- Start of Destinations ---------------------------------------------------//

app.post("/destination", upload.single("img"), (req, res) => {
  if (req.user == null) {
    res.status(405);
    res.send("Login first");
    return;
  }

  const destination = new Destination({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    img: "http://localhost:4000/file/" + req.file.filename,
    likedBy: [],
    postedBy: req.user.username,
  });
  destination.save().then(() => {
    res.send("destination added");
  });
});








app.get("/file/:file", (req, res) => {
  const path = "uploads/" + req.params.file;
  res.download(path);
});

// returns a list of all the destinations
app.get("/destinations", (req, res) => {
  Destination.find({}).then((destinations) => {
    res.send(destinations);
  });
});


// returns a list of all the destinations
app.get("/search", (req, res) => {
  let query = req.query.query;
  console.log("Query: "+query)
  Destination.find( 
    {$or: [
      {"title": {$regex: `${query}`, $options: 'i'}},
      {"description": {$regex: `${query}`, $options: 'i'}},
      {"location": {$regex: `${query}`, $options: 'i'}}
  ]}

  ).then((destinations) => {
    res.send(destinations);
  });
});



app.post("/like", (req, res) => {
  if (req.user == null) {
    res.status(405);
    res.send("Login first");
    return;
  }

  Destination.findOne({ _id: new ObjectId(req.body.destination) }).then(
    (destination) => {
      destination.likedBy.push(req.user.username);
      res.send(destination);
    }
  );
});

//----------------------------------------- END of Destinations ---------------------------------------------------//

//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
