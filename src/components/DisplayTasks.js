import React from 'react';

import './DisplayTasks.css';

export default (props) => {
    return (
        <div id="tasks">
            {props.tasks.map((t, i) => {
                return (
                    <div key={i} className="task" data-task={t.name}>
                        <span className={t.isCompleted ? "complete" : "inComplete"} onClick={props.toggleComplete} />
                        <span>{t.name}</span>
                        <span className="delete" onClick={props.removeTask}></span>
                    </div>
                );
            })}
        </div>
    );
}