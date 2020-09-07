import React from 'react'

class ShowAllTasksTable extends React.Component {
  render() {
    return (
      <div>
        <table style={{ width: '100%' }}>
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
                      <form onSubmit={this.props.callBack} className="button">
                        <input type="hidden" value={task.id} name="id" />
                        <input type="submit" value="Apply for Task" />
                      </form>
                    ))}
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}

export default ShowAllTasksTable
