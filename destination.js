const mongoose = require("mongoose");
const destination = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    img: String,
    likedBy: [String],
    postedBy: String,
});

module.exports = mongoose.model("Destination", destination);
