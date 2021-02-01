import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import axios from "axios";
import '../App.css'

// function that fetches random quotes from a free open source quotes provider
const getRandomQuote = async () => {
    const response = await axios.get('https://api.adviceslip.com/advice') // making the call to open source api
    return response.data.slip.advice //saving random quote to variables
}
const QuoteContainer = () => { //crating Quote container component
    const [quote, setQuote] = useState("") // creating state that will hold the quote
    getRandomQuote().then(q => { // calling function that retrieves quotes from open source
        setQuote(q) //saving quote to state
    })
    return( // returning this component to whomever calls it/needs it
        <Grid container justify="center">
            <Grid item className="quote-text">
                {quote}
            </Grid>
        </Grid>
    )
}

export default QuoteContainer // making files visible to other files