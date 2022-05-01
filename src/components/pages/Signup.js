import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {Link, Navigate} from "react-router-dom"
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    let navigate = useNavigate();
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        const confPassword = e.target[2].value;
        console.log(e.target)
        if (password !== confPassword) {
            return setError("Passwords do not match")
        }
        setError("")
        setLoading(true)
        signup(email, password).then((cred) => {
            console.log(cred)
            navigate("/dashboard")
        }).catch((err) => console.log(err))
        setLoading(false)
    }
    return (
        <>{currentUser ? <Navigate to={"/dashboard"}/> :
            <>
                <div className="Card container  container-center background-planes">
                    <div className={""}>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <div variant="danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username </label>
                                <input placeholder="Username" type="text" ref={usernameRef} required/>
                            </div>
                            <div className="form-group">
                                <label>Password </label>
                                <input placeholder="Password" type="password" ref={passwordRef} required/>
                            </div>
                            <div className="form-group">
                                <label>Password Confirmation </label>
                                <input placeholder="Password" type="password" ref={passwordConfirmRef} required/>
                            </div>
                            <button disabled={loading} className="button" type="submit">
                                Sign Up
                            </button>
                        </form>
                        <div className="w-100 text-center mt-2">
                            Already have an account? <Link className="c-white" to="/login">Log In</Link>
                        </div>
                    </div>
                </div>
            </>}
        </>);
}
export default Signup;

