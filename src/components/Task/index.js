import React, {useState} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './event.css'
import {Grid, MenuItem} from "@material-ui/core";
import {TimeDurationOptions} from "./TimeDurationOptions";
import {updateEventOnDB, addEventToDB, deleteEventOnDB} from "../../DBActions";
// The above are libraries and files I need for this file to work

const EVENT_ACTION = {
    ADD: "ADD",
    DELETE: "DELETE",
    EDIT: "EDIT"
} // creating dictionary to know when a event action is supposed to add, update or delete

const RESET_INPUT_STATE = {
    event: {
        name: "",
        description: "",
        duration: "",
        date: ""
    },
    modified: false,
    eventAction: "ADD"
} // creating a state object that will clear the input fields on the website once a user triggered an action

const Event = (props) => { // Creating Event component
    const {event, eventAction, toggleAppRerender} = props // saving passed variables from App.js to variables
    const INITIAL_STATE = {
        event: event,
        modified: false,
        eventAction: eventAction
    } // setting the initial state of an event
    const [localEvent, setLocalEvent] = useState(INITIAL_STATE) // creating state variables to hold state
    const [shouldDelete, setShouldDelete] = useState(false) // creating state variables that hold delete button actions

    const handleNameChange = event => { // function that gets called when the name of an event is changed by the user
        event.preventDefault() // react function that prevents empty entries on input fields
        setLocalEvent(// setting local event to the new changes entered by user
            {
                ...localEvent,
                event: {
                    ...localEvent.event,
                    name: event.target.value
                },
                modified: true
            }
        )
    }

    const handleDescriptionChange = event => { // function that gets called when an event description is changed by the user
        event.preventDefault() // react function that prevents empty entries on input fields
        setLocalEvent( // setting local event to changes entered by users
            {
                ...localEvent,
                event: {
                    ...localEvent.event,
                    description: event.target.value
                },
                modified: true
            }
        )
    }

    const handleDurationChange = event => { // function that gets called when duration is changed by the user
        event.preventDefault() // react function that prevents empty entries on input fields
        setLocalEvent( // setting local event to the user entries
            {
                ...localEvent,
                event: {
                    ...localEvent.event,
                    duration: event.target.value
                },
                modified: true,
            }
        )
    }

    const handleDateChange = event => { // function that gets called when the date is changed by the user
        event.preventDefault() // react function that prevents empty entries on input fields
        setLocalEvent( // assigning local event to user input entries
            {
                ...localEvent,
                event: {
                    ...localEvent.event,
                    date: event.target.value
                },
                modified: true,
            }
        )
    }

    const getSaveButton = (modifiedEvent) => { // function that gets the html that shows buttons

        const saveToDBAction = async () => { // function that makes a call to external file function to save event to database
            const response = await updateEventOnDB(modifiedEvent.event) // saving the response to a variable
            if (response.status === 200) {// logic to test if api call worked
                setLocalEvent({...localEvent, modified: false}) // changing modified to false so edit button disappears
                toggleAppRerender(true) // setting reRender to true to rerender newly saved events
            } else if (response.status >= 500) {// prompting error if there is an error
                console.error("Error while updating Event in DB") // printing error
            }
        }

        const addToDBAction = async () => { // function that calls external file's function to add an event to the database
            const response = await addEventToDB(modifiedEvent.event) // savig response to variable
            if (response.status === 201) { // checking if api call was successful
                setLocalEvent(RESET_INPUT_STATE) // resetting input fields for user if they need to add a new task
                toggleAppRerender(true) //setting rerender to true in order to tell App.js to fetch updated events from server
            } else if (response >= 500) { // taking care of errors if something goes wrong
                console.error("Error while adding event to DB") // printing error to the console
            }
        }

        if (modifiedEvent.modified === true && modifiedEvent.eventAction === EVENT_ACTION["EDIT"]) { // if editing an event then return Save button
            return (
                <Button variant="contained" color="primary" style={{cursor: "pointer"}} onClick={() => saveToDBAction()}>
                    Save
                </Button>
            )
        } else if (modifiedEvent.modified === true && modifiedEvent.eventAction === EVENT_ACTION["ADD"]) {
            // if action is adding an event, then return the save button
            return (
                <Button variant="contained" style={{cursor: "pointer"}} onClick={() => addToDBAction()}>
                    Add
                </Button>
            )
        } else return null
    }

    const showDeleteButton = () => { // function to show delete button when hovering over event
        setShouldDelete(true) // setting state that makes button show up to true
    }

    const hideDeleteButton = () => {  // function top hide delete button when leaving the hovering action on event
        setShouldDelete(false) // setting state to false to hide button
    }

    const getDeleteButton = (modifiedEvent) => { // function that returns the html that has the delete button
        const deleteToDBAction = async () => { // action that calls external function to delete an event in the server
            const response = await deleteEventOnDB(modifiedEvent.event) // making call to external function
            if (response.status === 200) {// if no errors
                toggleAppRerender(true) // re render to fetch updated list of tasks
            } else { // if there are errors
                console.log('Error while deleting an event') // print to console
            }
        }

        if (shouldDelete === true && modifiedEvent.eventAction === EVENT_ACTION["EDIT"]) { // if action is edit and event is hovered,
            // return delete button
            return (
                <Button variant="contained" color="secondary" style={{cursor: "pointer"}} onClick={() => deleteToDBAction()}>
                    DELETE
                </Button>
            )
        } else { // return nothing
            return null
        }
    }

    return ( // return event component
        <Grid item>
            <Card className="event-card" onMouseEnter={showDeleteButton} onMouseLeave={hideDeleteButton}>
                <CardContent>
                    <TextField required label="Name"
                               value={localEvent.event.name} onChange={e => handleNameChange(e)}/>
                    <TextField required label="Description"
                               value={localEvent.event.description} onChange={e => handleDescriptionChange(e)}/>
                    <TextField
                        select
                        label="Duration"
                        value={localEvent.event.duration}
                        onChange={e => handleDurationChange(e)}
                        helperText="Please select your duration"
                    >
                        {TimeDurationOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="datetime-local"
                        label="Date"
                        type="datetime-local"
                        value={localEvent.event.date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => handleDateChange(e)}
                    />
                </CardContent>
                <CardActions>
                    {getSaveButton(localEvent)}
                    {getDeleteButton(localEvent)}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Event // make file visible to others