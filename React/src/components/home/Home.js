import React from "react";
import Base from "../Base";
import BannerMessageController from "../materialUI/BannerMessageController";
import TaskManager from "../tasks/TaskManager";

function Home(props) {

  var taskManager = <div></div>

  if(props.authenticated !== "None")
    taskManager = <TaskManager {...props} ></TaskManager>

  return (
    <div>
      <Base {...props} ></Base>
      <BannerMessageController {...props} />
      {taskManager}
    </div>
  );
}

export default Home;
