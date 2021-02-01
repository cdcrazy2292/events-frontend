import React from "react";
import {Grid} from "@material-ui/core";
import Event from "../components/Task";

// Component that adds a task
const AddTaskContainer = (props) => {
    return( // Using Event Component I've created
        <Grid container justify="center">
            <Event event={{}} eventAction={"ADD"} toggleAppRerender={props.toggleAppRerender} />
        </Grid>
    )
};

export default AddTaskContainer // Making this file visible to others