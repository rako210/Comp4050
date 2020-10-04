import React from 'react'

/** 
 * Button to apply for tasks
 * @param data Data about the task
 * @param callBack Api method to call when submitting request
 */
export class ApplyButton extends React.Component {
    render() {
        let render;

        if(this.props.data.isRegistered)
            render = <div style={{color: 'green'}}>You have already applied!</div>;

        else
            render =
            <form onSubmit={this.props.callBack} className="button">
                <input type="hidden" value={this.props.data.id} name="id" />
                <input type="submit" value="Apply for Task" />
            </form>

        return render
    }
}