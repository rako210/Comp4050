import React, { Component } from 'react'
import { DeleteButton, EditButton, MarkCompleteButton } from '../common/Button'

class ShowAllCreatedTasksTable extends Component {
  render() {
    return (
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Time Created</th>
              <th>owner</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
              <th>Chosen Helper</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.time}</td>
                  <td>{task.owner}</td>
                  <td>{task.title}</td>
                  <td>{task.location}</td>
                  <td>{task.description}</td>
                  {task.selectedUserID != null ? (
                    <p>{task.selectedUsername}</p>
                  ) : (
                    <p>No User has been selected</p>
                  )}
                  <td>{task.status}</td>
                  <td>
                    {(task.isRegistered && (
                      <div>You have already applied!</div>
                    )) ||
                      (!task.isRegistered && (
                        <EditButton data={task}></EditButton>
                      ))}
                  </td>
                  <td>
                    <DeleteButton
                      {...this.props}
                      taskID={task.id}
                    ></DeleteButton>
                  </td>
                  <td>
                    <MarkCompleteButton
                      {...this.props}
                      data={task}
                    ></MarkCompleteButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShowAllCreatedTasksTable
