import React from "react";

/**
 * Button to display all tasks
 * @param callBack function to provide array of all tasks
 * @param 
 */
class ShowAllCreatedTasksButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {allTasks: null, registedTasks: null}
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick(event) {

        event.preventDefault();

        const fetchData = () => Promise.all([
            fetch('/api/list/task/created-by-user')
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
                <input type="submit" value="Show my created Tasks" />
            </form>
        )

    }
}

export default ShowAllCreatedTasksButton;