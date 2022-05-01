import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {Link, Navigate} from "react-router-dom"
import {useNavigate} from 'react-router-dom';

function LoginComponent() {
    let navigate = useNavigate();
    const usernameRef = useRef()
    const passwordRef = useRef()
    const {currentUser, setCurrentUser} = useAuth()
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        console.log(e.target)


        setError("")
        setLoading(true)
        login(email, password).then((res) => {
            console.log(res.data)
            setCurrentUser(res.data)
            navigate("/dashboard")
        }).catch((err) => console.log(err))
        setLoading(false)
    }

    return (
        <>{currentUser ? <Navigate to={"/dashboard"}/> :
            <div>

                <div className={"Card container  container-center background-planes"}>

                    <div>
                        <div >
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <div variant="danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input placeholder="Username" type="text" ref={usernameRef} required/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input placeholder="Password" type="password" ref={passwordRef}
                                           required/>
                                </div>
                                <button className="button" type="submit">
                                    Login
                                </button>
                            </form>
                        </div>
                        <div className="w-100 text-center mt-2">
                            Dont have an account? <Link className="c-white bold" to="/register"> Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}


export default LoginComponent;
