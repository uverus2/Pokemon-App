import React from 'react';
import { ThemeProvider } from "styled-components";

// Views 
import Home from "./Views/Home";
import Error from "./Views/Error";
import Compare from "./Views/Compare";
import Profile from "./Views/Profile";

// Components imported 
import Header from "./Components/Header";
import Devider from "./Components/Devider";

// Styles 
import theme from "./styles/theme.js";
import GlobalStyles from "./styles/GlobalStyles";

// Config
import Store from "./config/store";

import { Switch, Route} from "react-router-dom";

// Components

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
    <Store> 
      <div className="App">
        <ThemeProvider theme={theme}>
        <GlobalStyles />
      <Switch> 
        <Route exact path="/" component={() => <IncludeHeader children={<Home/>}/> }/>
        <Route exact path="/compare" component={() => <IncludeHeader children={<Compare/>}/> }/>
        <Route exact path="/profile" component={() => <IncludeHeader children={<Profile/>}/> }/>
        <Route path="*" component={Error}/>
        </Switch>
        </ThemeProvider>
      </div>
    </Store>
  );
}

export default App;
