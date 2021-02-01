import './App.css';
import EventsContainer from "./containers/EventsContainer";
import {Container} from "@material-ui/core";
import QuoteContainer from "./containers/QuoteContainer";
import AddTaskContainer from "./containers/AddTaskContainer";
import {useState} from "react";
import HeaderContainer from "./containers/HeaderContainer";
// All of the above are dependencies we need from libraries and files I've created that are within the project but in
// other folders

function App() { // App Start
    const [renderState, setRenderState] = useState(false) // setting state for refreshes when an event is added
    const toggleAppRerender = renderState => { // function that handles the assignment of renderState
        setRenderState(renderState) // assigning renderState to the value passed in the function parameter
    }
    return ( // returning the app. The below is a skeleton of the components I've created
            <Container>
                <HeaderContainer />
                <AddTaskContainer toggleAppRerender={toggleAppRerender}/>
                <EventsContainer toggleAppRerender={toggleAppRerender} renderState={renderState} />
                <QuoteContainer/>
            </Container>
    );
}

export default App; // making visible to other files
