import React from "react";
import '../App.css'
import {Grid} from "@material-ui/core";

const HeaderContainer = () => {
    // using Grid from Material UI
    return( // just returning the title of the site
        <Grid container justify="center">
            <Grid item className="header-text">
                My Schedule
            </Grid>
        </Grid>
    )
}

export default HeaderContainer // making this visible to other files