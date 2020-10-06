import { ConsoleSqlOutlined } from "@ant-design/icons";
import React from "react";
import Base from "../Base";
import TaskManager from "../tasks/TaskManager"

function Home(props) {

  var bannerMessage = "";
  var taskManager = <div></div>

  if(props.location.state != null && 'bannerMessage' in props.location.state)
    bannerMessage = props.location.state.bannerMessage

  if(props.authenticated !== "None")
    taskManager = <TaskManager authenticated={props.authenticated}></TaskManager>

  return (
    <div>
      <Base authenticated={props.authenticated} userData={props.userData}></Base>
      {bannerMessage}
      {taskManager}
    </div>
  );
}

export default Home;
