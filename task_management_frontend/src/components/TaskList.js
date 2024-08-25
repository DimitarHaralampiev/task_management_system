import React, { useEffect, useState } from 'react';
import {get_tasks} from "../services/api";

function TaskList({token}) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await get_tasks(token);
            setTasks(taskData);
        };
        fetchTasks();
    }, [token]);

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}: {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;