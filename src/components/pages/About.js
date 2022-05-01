import React from 'react';
import "../css/style.css"
import travelBackground from "../pictures/image1.jpeg"


export default function About() {

    return (
        <div>
            <div className="about_section layout_padding">
                <div className="l-container vh70">
                    <div className="row h100">
                        <div className="col-70 pd-2">
                            <h1 className="about-title">About Us</h1>
                            <p className="justified"> <center>        No matter who you are or where you’re going, you deserve to travel freely. Discover your dream destination and find where to travel.</center></p>
                            <div className="center h100">
                                <a href="/destinations" className="btn-fancy"><span>Check destinations</span></a>
                            </div>
                        </div>
                        <div className="col-50 h100">
                            <img height="100%" width = "100%" src={travelBackground} alt="Travel" className="about_img"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
