import React, { useState } from "react";
import { create_task } from "../services/api";

function TaskForm({ token }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const taskData = {
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority,
                status: "pending",
            };
            await create_task(taskData);
        } catch (error) {
            console.error("Failed to login", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type={"text"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Title"}
                required={true}/>
            <input type={"password"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"Description"}
                required={true}/>
            <input type={"datetime-local"}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder={"Due Date"}/>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type={"submit"}>Create Task</button>
        </form>
    )
}

export default TaskForm;