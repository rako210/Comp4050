import React from "react";
import Base from "../Base";
import TaskManager from "../tasks/TaskManager"

function Home(props) {
  return (
    <div>
      <Base authenticated={props.authenticated}></Base>
      {
        (props.authenticated !== "None") &&
        (<TaskManager authenticated={props.authenticated}></TaskManager>)
      }
    </div>
  );
}

export default Home;