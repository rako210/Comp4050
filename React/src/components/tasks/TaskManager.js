import React, { useState, useEffect } from "react";
import Base from "../Base";
import AddTask from "./AddTask";

class TaskManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userID: null, showTasks: "False", tasktype: null, tasks: null, appliedTasks: [], bannerMessage: ""};

    fetch("/api/getUserID")
      .then(res => res.json())
      .then(data =>this.setState({userID: data.result}))

    this.displayAllTasks = this.displayAllTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.applyForTask = this.applyForTask.bind(this);
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

    fetch("/api/getUserTasks")
      .then(res => res.json())
      .then(data => this.setState({appliedTasks: data.result}))

    console.log(this.state.appliedTasks);
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

  applyForTask(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    fetch("/apply_for_task", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.result === "True")
          this.setState({bannerMessage: "Sucessfully applied for task!"})
        else
          this.setState({bannerMessage: "Please sign in to apply for tasks!"})
      });

    // Update Applied Tasks
    fetch("/api/getUserTasks")
      .then(res => res.json())
      .then(data => this.setState({appliedTasks: data.result}))

  }

  render() {
    let taskTable;

    const tasks = this.state.tasks;
    const appliedTasks = this.state.appliedTasks;
    const userID = this.state.userID;

    if (this.state.showTasks === "True" && tasks != null) {
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
                  <td>
                      {<ApplyForTask jobID={index.id} userID={userID} callBack={this.applyForTask} listOfAppliedJobs={appliedTasks} ></ApplyForTask>}
                  </td>
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

        {this.state.bannerMessage} 
        {
          (this.state.showTasks === "True" && tasks != null) &&
          (<TaskTable data={tasks} userID={userID} callBack={this.applyForTask} listOfAppliedJobs={appliedTasks}></TaskTable>)
        }
      </div>
    );
  }
}

class TaskTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const data = this.props.data;
    const userID = this.props.userID;
    const handleClick = this.props.callBack
    const listOfAppliedJobs = this.props.listOfAppliedJobs;

    return (

      

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
            {data.map((index, value) => {
              return (
                <tr>
                  <td>{index.id}</td>
                  <td>{index.time}</td>
                  <td>{index.owner}</td>
                  <td>{index.title}</td>
                  <td>{index.location}</td>
                  <td>{index.description}</td>
                  <td>
                      <ApplyForTask jobID={index.id} userID={userID} callBack={handleClick} listOfAppliedJobs={listOfAppliedJobs} ></ApplyForTask>
                  </td>
                </tr>
              );
            })}
          </table>
      </div>

    )

  }

}

class ApplyForTask extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const jobID = this.props.jobID;
    const userID = this.props.userID;
    const handleClick = this.props.callBack
    const listOfAppliedJobs = this.props.listOfAppliedJobs;

    let check = false;

    listOfAppliedJobs.forEach(task => {
      if(task.jobID == jobID && task.userID == userID)
        check = true;
    });

    if(check) {
      return(
        <div>Applied for Task</div>
      )
    } else {
      return(
        <form onSubmit={handleClick} id="apply_for_task" class="button" >
          <input type="hidden" value={jobID} name="id" />
          <input type="submit" value="Apply for Task" />
        </form>
      )
    }

  }

}

export default TaskManager;
