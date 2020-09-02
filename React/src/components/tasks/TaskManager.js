import React, { useState, useEffect } from "react";
import Base from "../Base";
import AddTask from "./AddTask";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

class TaskManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showTasks: "False", tasktype: null, tasks: null };
    this.displayAllTasks = this.displayAllTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  displayAllTasks(event) {
    event.preventDefault();

    this.setState({ showTasks: "True", tasktype: event.target.tasktype.value });

    const data = new FormData(event.target);

    fetch("/gettask", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data.result });
      });

    console.log(this.state.tasks);
  }

  deleteTask(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    fetch("/deletetask", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data.result });
      });
  }

  render() {
    let taskTable;

    const tasks = this.state.tasks;
    console.log(tasks);

    if (this.state.showTasks === "True" && tasks != null) {
      console.log(tasks);
      taskTable = (
        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <th>ID</th>
              <th>Time Created</th>
              <th>owner</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
            {tasks.map((index, value) => {
              return (
                <tr>
                  <td>{index.id}</td>
                  <td>{index.time}</td>
                  <td>{index.owner}</td>
                  <td>{index.title}</td>
                  <td>{index.location}</td>
                  <td>{index.description}</td>
                </tr>
              );
            })}
          </table>
        </div>
      );
    } else {
      taskTable = <div></div>;
    }

    return (
      <div>
        <form action="/addtask" method="POST" id="addtask" class="button">
          <input type="submit" value="Add A New Task" />
        </form>

        <form onSubmit={this.displayAllTasks} class="button">
          <input type="hidden" name="tasktype" value="0" />
          <input type="submit" value="Get All Available Tasks" />
        </form>

        <form onSubmit={this.displayAllTasks} class="button">
          <input type="hidden" name="tasktype" value="1" />
          <input type="submit" value="Get My Tasks" />
        </form>

        <form onSubmit={this.deleteTask} class="button">
          <input type="number" name="taskid" />
          <input type="submit" value="Delete A Task" />
        </form>

        {taskTable}
      </div>
    );
  }
}

export default TaskManager;
