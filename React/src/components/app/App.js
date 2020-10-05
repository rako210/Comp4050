import React, { useState, useEffect } from "react";
import About from "../about/About";
import CreateAccount from "../settings/CreateAccount";
import AccountSettings from "../settings/AccountSettings";
import EditTask from '../tasks/EditTask'
import Home from "../home/Home";
import UserProfile from "../userProfile/UserProfile"

/*---------------------------------------*/
/*all the css file imports here */
import "./App.css";
import "../NavigationBar/Navbar.css";
import "../about/About.css"

/*---------------------------------------*/


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [login, setLogin] = useState('User');

  useEffect(() => {
    fetch("/user_login")
      .then((res) => res.json())
      .then((data) => {
        setLogin(data.data);
      });
  }, []);

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/accountProfile">
            <UserProfile authenticated={login}></UserProfile>
          </Route>
        <Route path="/editTask">
            <EditTask authenticated={login}></EditTask>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/accountSettings">
            <AccountSettings authenticated={login}/>
          </Route>
          <Route path="/createAccount">
            <CreateAccount></CreateAccount>
          </Route>
          <Route path="/">
            <Home authenticated={login}></Home>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
