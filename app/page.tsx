"use client";
import { useState, useEffect } from "react";
import Mission from "@/components/Mission";
import Done from "@/components/Done";

export default function Home() {
  const [isMissions, setMissions] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState({ id: 0, title: "", description: "" });
  const [loaded, setLoaded] = useState(false);

  // Add new mission
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    setTasks([
      ...tasks,
      { ...newTask, id: Date.now() + Math.floor(Math.random() * 1000) },
    ]);
    setNewTask({ title: "", description: "", id: 0 });
  };

  // Move task to Done list
  const handleCompleteTask = (task) => {
    setCompletedTasks([
      ...completedTasks,
      { ...task, date: new Date().toLocaleString() },
    ]);
    setTasks(tasks.filter((t) => t.id !== task.id)); // remove from missions
  };

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("Missions") || "[]");
    const localCompletedTasks = JSON.parse(
      localStorage.getItem("CompletedMissions") || "[]"
    );
    setTasks(localTasks);
    setCompletedTasks(localCompletedTasks);
    setLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("Missions", JSON.stringify(tasks));
  }, [tasks, loaded]);

  useEffect(() => {
    localStorage.setItem("CompletedMissions", JSON.stringify(completedTasks));
  }, [completedTasks, loaded]);

  return (
    <div className="justify-items-center p-4">
      <div>
        <h1 className="text-2xl text-green-400 font-bold mb-2">
          Create a new mission
        </h1>
        <form onSubmit={handleAdd} className="flex flex-row gap-2">
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
            className="bg-green-400 text-white p-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </form>
      </div>

      <div className="flex justify-center p-2 gap-1 mt-4 bg-green-400 rounded-3xl">
        <button
          className={`p-1 rounded-4xl ${isMissions ? "bg-white" : ""}`}
          onClick={() => setMissions(true)}
        >
          Missions
        </button>
        <button
          className={`p-1 rounded-4xl ${!isMissions ? "bg-white" : ""}`}
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
