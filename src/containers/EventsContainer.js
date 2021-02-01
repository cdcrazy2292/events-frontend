import React, {useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import axios from "axios";
import Event from "../components/Task";

/**
 * Function to retrieve events from server
 */
const fetchEvents = async () => {
    const response = await axios.get("http://localhost:4000/all") // making api call to backend server to get events
    const data = response.data // saving the returned data to variable
    return data // returning the data
}

const EventsContainer = (props) => { // Component that houses the events
    const {toggleAppRerender, renderState} = props // reading variables passed here from App component
    const [events, setEvents] = useState([]) // creating state that will hold events and rerender the page when changes are detected
    useEffect(() => { // React utility to check for changes in state and know when to re-render the page with updates
        fetchEvents().then(data => {
            setEvents(data) // if changes are found, save them to state
        })
    }, [events.length]) // the object React uses to understand what's changing, In my case, the number of fetched elements

    if (renderState === true) { // helper function to re render the page when I add, edit or delete am event
        fetchEvents().then(data => { // making call to function that fetches events from the server
            setEvents(data) // saving fetched events to state
            toggleAppRerender(false) // letting App.js know that it needs to re render
        })
    }

    const getTasks = () => { // function that returns a task component once the events are fetched from the server
        return events.map(event => { // since the events is an array of multiple elements, I loop through the array and assing
            // each event to a Event component
            return <Event event={event} eventAction={"EDIT"} toggleAppRerender={toggleAppRerender} key={event._id}/> // returning my Event component
        })
    }

    return( // returning this component to the file that calls it
        <Grid container direction="column" alignItems="center" justify="space-between">
            {getTasks()}
        </Grid>
    )
}

export default EventsContainer //making file visible to other files