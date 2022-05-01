import React, {Component, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {addDestination} from "../../context/Database";


export default function AddDestination() {
    const [image, setImage] = useState()
    const {currentUser} = useAuth()
    const imageRef = React.createRef()
    const navigation = useNavigate()
    const addNewDestination = (event) => {
        event.preventDefault();
        console.log(event)
        if (image == null)
            return
        const ext = image.name.substring(image.name.lastIndexOf("."));
        if (!(ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".svg")) {
            imageRef.current.setCustomValidity("file must be jpg, jpeg or png");
            return;
        }

        console.log(image)
        const destination = {
            title: event.target[0].value,
            location: event.target[1].value,
            description: event.target[2].value,
            img: image,
        }

        addDestination(destination).then(res => {

            navigation('/destinations')

        })
        console.log(destination)

    }

   const changeImage = (event) => {
        setImage(event.target.files[0])
    }

        return (
            <div>

                <h1>Add new destination</h1>

                <div className="w-50" style={{margin: "auto"}}>
                    <form onSubmit={addNewDestination}>

                        <div className="align-items-center g-3">
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputTitle">Title</label>
                                <input type="text" className="form-control w-100" id="inputTitle" required placeholder="Title"/>
                            </div>
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputLocation">Location</label>
                                <input type="text" className="form-control" id="inputLocation"
                                       placeholder="Location" required/>
                            </div>

                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputDescription">Description</label>
                                <textarea className="form-control" id="inputDescription"
                                       placeholder="Description" rows="3" required/>
                            </div>

                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputImage">Image</label>
                                <input type="file" className="form-control" id="inputImage"
                                       placeholder="Image" required onChange={changeImage}/>
                            </div>

                            <div className="col-auto">
                                <button type="submit" onSubmit={addNewDestination} className="btn btn-primary">Post Destination</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );
}
