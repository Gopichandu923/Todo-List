"use client";
import { useState } from "react";
import Mission from "@/components/Mission";
import Done from "@/components/Done";

export default function Home() {
  const [isMissions, setMissions] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Add new mission
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    setTasks([...tasks, newTask]);
    setNewTask({ title: "", description: "" });
  };

  // Move task to Done list
  const handleCompleteTask = (task) => {
    setCompletedTasks([
      ...completedTasks,
      { ...task, date: new Date().toLocaleString() },
    ]);
    setTasks(tasks.filter((t) => t !== task)); // remove from missions
  };

  return (
    <div className="justify-items-center p-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">Create a new mission</h1>
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <input
            type="text"
            value={newTask.title}
            placeholder="Enter title"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newTask.description}
            placeholder="Enter description"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>

      <div className="flex justify-center gap-4 p-3 mt-4 bg-orange-400 rounded-md">
        <button
          className={`p-2 rounded-xl ${isMissions ? "bg-white" : ""}`}
          onClick={() => setMissions(true)}
        >
          Missions
        </button>
        <button
          className={`p-2 rounded-xl ${!isMissions ? "bg-white" : ""}`}
          onClick={() => setMissions(false)}
        >
          Done
        </button>
      </div>

      <div className="mt-4">
        {isMissions ? (
          <Mission tasks={tasks} AddToDone={handleCompleteTask} />
        ) : (
          <Done completedTasks={completedTasks} />
        )}
      </div>
    </div>
  );
}
