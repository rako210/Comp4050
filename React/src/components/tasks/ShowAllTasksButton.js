import React from "react";

/**
 * Button to display all tasks
 * @param callBack function to provide array of all tasks
 * @param 
 */
class ShowAllTasksButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {allTasks: null, registedTasks: null}
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick(event) {

        event.preventDefault();

        const fetchData = () => Promise.all([
            fetch('/api/list/task/all')
                .then(res => res.json())
        ]);

        fetchData()
            .then(([allTasks]) => {
                
                this.props.callBack(allTasks);

            });

    }

    render() {

        return(
            // <Button callBack={this.displayAllTasks} buttonType="hidden" name="tasktype" value="0" displayText="Show all Tasks"></Button>
            <form onSubmit={this.handleClick} className="button">
                {/* <input type="hidden" name={this.props.name} value={this.props.value} /> */}
                <input type="submit" value="Show all Tasks" />
            </form>
        )

    }
}

export default ShowAllTasksButton;