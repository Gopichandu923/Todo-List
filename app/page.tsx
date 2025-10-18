"use client";
import { useState } from "react";
import Mission from "@/components/Mission";
import CompletedTask from "@/components/CompletedTask";

export default function Home() {
  const [isMissions, setMissons] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // method for adding mission
  const handleAdd = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask({ title: "", description: "" });
  };

  return (
    <div className="justify-items-center">
      <div>
        <h1>Create a new mission</h1>
        <form>
          <input
            type="text"
            value={newTask.title}
            placeholder="Enter title"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          ></input>
          <input
            type="text"
            value={newTask.description}
            placeholder="Enter Description"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          ></input>
          <button onClick={handleAdd}>Add</button>
        </form>
      </div>
      <div className="flex flex-row justify-center  p-2 bg-orange-400 rounded-md">
        <button className="p-2  rounded-xl" onClick={() => setMissons(true)}>
          Missions
        </button>
        <button className="p-2  rounded-xl" onClick={() => setMissons(false)}>
          Done
        </button>
      </div>
      <div>
        {isMissions && <Mission tasks={tasks} />}{" "}
        {!isMissions && <CompletedTask />}
      </div>
    </div>
  );
}
