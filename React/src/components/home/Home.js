import React, { useState, useEffect } from "react";
import Base from "../Base";
import TaskManager from "../tasks/TaskManager"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function Home(props) {
  return (
    <div>
      <Base authenticated={props.authenticated}></Base>
      <TaskManager authenticated={props.authenticated}></TaskManager>
    </div>
  );
}

export default Home;