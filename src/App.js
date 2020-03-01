import React from 'react';

// Views 
import Home from "./Views/Home";
import Error from "./Views/Error";

// Components 
import Header from "./Components/Header"

import {
  Switch,
  Route
} from "react-router-dom";

function IncludeHeader(props) {

  return(
    <div id="Header">
      <Header/>
       {props.children}
    </div>
  );
}

function App() {
  return (
    <div className="App">
     
     <Switch> 
       <Route exact path="/" component={() => <IncludeHeader children={<Home/>}/> }/>
       <Route path="*" component={Error}/>
      </Switch>
    </div>
  );
}

export default App;
