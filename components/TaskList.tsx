"use client";

import { Task } from "../app/page";
import { handleAdd, handleCompleteTask, handleRemoveTask } from "@/app/actions";
import { useState } from "react";
import Mission from "./Mission";
import Done from "./Done";

interface TaskListProps {
    initialTasks: Task[];
    initialCompletedTasks: Task[];
    userId: string;
}

export default function TaskList({ initialTasks, initialCompletedTasks, userId }: TaskListProps) {
    const [isMissions, setMissions] = useState(true);
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const onAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title.trim() || !newTask.description.trim()) return;
        await handleAdd(newTask.title, newTask.description, userId);
        setNewTask({ title: "", description: "" });
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Add Task Form */}
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl text-green-500 font-bold mb-4 text-center">
                    Create a new mission
                </h1>
                <form className="flex flex-col sm:flex-row gap-2" onSubmit={onAdd}>
                    <input
                        type="text"
                        value={newTask.title}
                        placeholder="Enter title"
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="flex-1 border p-3 rounded focus:outline-none focus:border-green-400"
                    />
                    <input
                        type="text"
                        value={newTask.description}
                        placeholder="Enter description"
                        onChange={(e) =>
                            setNewTask({ ...newTask, description: e.target.value })
                        }
                        className="flex-1 border p-3 rounded focus:outline-none focus:border-green-400"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition-colors"
                    >
                        Add
                    </button>
                </form>
            </div>

            {/* Toggle Missions / Done */}
            <div className="flex justify-center p-2 gap-2 mt-6 bg-green-400 rounded-full w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                <button
                    className={`flex-1 p-2 rounded-full ${isMissions ? "bg-white text-green-500 font-semibold" : "text-white"
                        }`}
                    onClick={() => setMissions(true)}
                >
                    Missions
                </button>
                <button
                    className={`flex-1 p-2 rounded-full ${!isMissions ? "bg-white text-green-500 font-semibold" : "text-white"
                        }`}
                    onClick={() => setMissions(false)}
                >
                    Done
                </button>
            </div>

            {/* Tasks List */}
            <div className="mt-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                {isMissions ? (
                    <Mission
                        tasks={initialTasks}
                        AddToDone={(task) => handleCompleteTask(task.id)}
                        RemoveTask={(task) => handleRemoveTask(task.id)}
                    />
                ) : (
                    <Done
                        Tasks={initialCompletedTasks}
                        RemoveCompletedTask={(task) => handleRemoveTask(task.id)}
                    />
                )}
            </div>
        </div>
    );
}
