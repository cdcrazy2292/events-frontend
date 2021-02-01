import axios from "axios"; // importing library that makes it easy to call external apis

const DB_URL = "http://localhost:4000" // base URL that points to the backend server locally

const updateEventOnDB = async eventBody => { // function that updates an event in the database by calling the server
    const targetUrl = `${DB_URL}/update-event` // changing url to point to update-event url
    const response = await axios.put(targetUrl, eventBody, {headers: { // using axios to call server and tell it to update an event
            'Content-Type': 'application/json'
        }})
    return response // returning the response from the server
}

const addEventToDB = async eventBody => { // function to add an event to the database
    const targetUrl = `${DB_URL}/add-event` // adding path to url to point to add-event url
    const response = await axios.post(targetUrl, eventBody, { headers: { // using axios to tell the server to add an event
            'Content-Type': 'application/json'
        }})
    return response // return response
}

const deleteEventOnDB = async eventBody => { // function to delete an event from the database
    const targetUrl = `${DB_URL}/event/${eventBody._id}` // changing url to add delete path
    return axios.delete(targetUrl) // returning response

}

export {
    updateEventOnDB,
    addEventToDB,
    deleteEventOnDB
} // making functions available to other files to use