import React from "react";

class ShowAllCreatedTasksTable extends React.Component {
  render() {
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
          {this.props.data.map((task) => {
            return (
              <tr>
                <td>{task.id}</td>
                <td>{task.time}</td>
                <td>{task.owner}</td>
                <td>{task.title}</td>
                <td>{task.location}</td>
                <td>{task.description}</td>
                <td>
                  {(task.isRegistered && (
                    <div>You have already applied!</div>
                  )) ||
                    (!task.isRegistered && (
                      <form
                        action="/editTask"
                        className="button"
                      >
                        <input type="hidden" value={task.id} name="id" />
                        <input type="submit" value="Edit Task" />
                      </form>
                    ))}
                </td>
                <td>
                  <DeleteButton callBack={this.props.forceUpdate} taskID={task.id}></DeleteButton>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

class DeleteButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    fetch('/deletetask', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {})

    this.props.callBack();

  }

  render() {
    return(
      <form
        onSubmit={this.handleClick}
        className="button"
      >
        <input type="hidden" value={this.props.taskID} name="taskid" />
        <input type="submit" value="Delete Task" />
      </form>
    );
  }

}

export default ShowAllCreatedTasksTable;
