import React from 'react';
import { ThemeProvider } from "styled-components";

// Views 
import Home from "./Views/Home";
import Error from "./Views/Error";

// Components 
import Header from "./Components/Header";
import Devider from "./Components/Devider";

// Styles 
import theme from "./styles/theme.js";

import {
  Switch,
  Route
} from "react-router-dom";

function IncludeHeader(props) {

  return(
    <div id="Header">
      <Header/>
      <Devider/>
       {props.children}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
     <Switch> 
       <Route exact path="/" component={() => <IncludeHeader children={<Home/>}/> }/>
       <Route path="*" component={Error}/>
      </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
