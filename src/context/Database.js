import axios from "axios";
import FormData from 'form-data'

export function addDestination(destination) {
    let data = new FormData();
    data.append('img', destination.img, destination.img);
    data.append('title', destination.title)
    data.append('location', destination.location)
    data.append('description', destination.description)
    return axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/destination",
        data: data,
    })
}

export function getDestinations(){

    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/destinations",

    })

}
