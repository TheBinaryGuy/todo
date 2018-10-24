import React from 'react';

import './AddTask.css';

export default (props) => {
    return (
        <form id="formData">
            <input id="taskName" placeholder="What you wanna remember?" />
            <button className="btn" id="btnSubmit" onClick={props.addTask}>Add</button>
            <button className="btn" onClick={props.clearAllTasks}>Clear All</button>
        </form>
    );
}