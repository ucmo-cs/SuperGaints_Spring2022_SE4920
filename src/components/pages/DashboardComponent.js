import {useAuth} from "../../context/AuthContext"
import {useNavigate} from "react-router-dom";
import '../css/style.css'
import React, {useEffect, useRef, useState} from "react";
import AddDestination from "./AddDestination";



export default function DashboardComponent() {
    const {logout, currentUser} = useAuth()
    const [isAddDestination, setIsAddDestination] = useState(false)
    const navigation = useNavigate()


    async function signout(e) {
        await logout();
        navigation('/')

    }


    return (<>
            <div className="pd-1">
                <div className="row">

                    <AddDestination/>

                    <button className="btn m-1" onClick={signout}><span>Sign out</span></button>
                </div>
            </div>
        </>
    );
}