import React, {createRef, useCallback, useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {getDestinations} from "../../context/Database";

export default function Destinations() {
    const [destinations, setDestinations] = useState([])
    const location = useLocation()
    const [load, setLoading] = useState(1)
    useEffect(() => {
        setDestinations([])
        getDestinations().then(res => {
            res.data.forEach(dest => {
                const destination = {
                    id: dest._id.toString(),
                    title: dest.title,
                    location: dest.location,
                    description: dest.description,
                    image: dest.img,
                    postedBy: dest.postedBy,
                }
                setDestinations(destinations => [...destinations, destination])
            })
        })

    }, [load])


    console.log(destinations)

    return (
        <div>
            <div className="container-50 center mb1 background-sky">
                <h1 className="black xlarge gideon-font"> Best places to visit </h1>
            </div>

            <div className="p-1">
                {destinations.map((destination) => {
                    return <div key={destination.id} className="container-sm row mb-1 " style={{margin: "auto", height: "50vh"}}>

                            <div className="col-9 " style={{}}>

                                <div className="l-container">
                                    <div id='title' className="s-container times-new-roman larger bold align-start">
                                        {destination.title}
                                    </div>
                                </div>
                                <div className="l-container h100">
                                    <p className="times-new-roman justified">
                                        {destination.description}
                                    </p>

                                    <div className="row gideon-font bold">
                                        <div className="col-50  m-0 p-0">
                                            <p>{destination.location} is best to visit in every season, located in the
                                                heart of {destination.location}.</p>
                                        </div>
                                    </div>

                                    <div className="row font-helvetic">
                                        <p>Posted by: {destination.postedBy}</p>
                                    </div>
                                    <div className="center pd-2">
                                        <button className="btn">

                                            <span ><i className="fa fa-thumbs-up">Like</i> </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 h100 center">
                                <img width="90%" height="80%" src={destination.image}/>
                            </div>

                    </div>
                })}
            </div>
        </div>
    );
}
