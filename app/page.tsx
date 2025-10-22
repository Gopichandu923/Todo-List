"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Mission from "@/components/Mission";
import Done from "@/components/Done";
import { useAuth } from "../contexts/AuthContext";
import { addTask, updateTask, deleteTask } from "../firebase/database";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  completedAt?: string;
}

export default function Home() {
  const router = useRouter();
  const { user } = useAuth() as { user: { uid: string } | null };

  const [isMissions, setMissions] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Pick<Task, "title" | "description">>({
    title: "",
    description: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Fetch tasks when logged in
  useEffect(() => {
    if (!user) return;

    const qMissions = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      where("isCompleted", "==", false)
    );

    const unsubscribeMissions = onSnapshot(qMissions, (snapshot) => {
      setTasks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task)));
    });

    const qDone = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      where("isCompleted", "==", true)
    );

    const unsubscribeDone = onSnapshot(qDone, (snapshot) => {
      setCompletedTasks(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task))
      );
    });

    return () => {
      unsubscribeMissions();
      unsubscribeDone();
    };
  }, [user]);

  // Add new task
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !newTask.title.trim() || !newTask.description.trim()) return;

    await addTask(newTask.title, newTask.description, user.uid);
    setNewTask({ title: "", description: "" });
  };

  // Mark as completed
  const handleCompleteTask = async (task: Task) => {
    if (!user) return;
    await updateTask(task.id);
  };

  // Delete task
  const handleRemoveTask = async (task: Task) => {
    if (!user) return;
    await deleteTask(task.id);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* Add Task Form */}
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-green-500 font-bold mb-4 text-center">
          Create a new mission
        </h1>
        <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleAdd}>
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
          className={`flex-1 p-2 rounded-full ${
            isMissions ? "bg-white text-green-500 font-semibold" : "text-white"
          }`}
          onClick={() => setMissions(true)}
        >
          Missions
        </button>
        <button
          className={`flex-1 p-2 rounded-full ${
            !isMissions ? "bg-white text-green-500 font-semibold" : "text-white"
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
            tasks={tasks}
            AddToDone={handleCompleteTask}
            RemoveTask={handleRemoveTask}
          />
        ) : (
          <Done
            Tasks={completedTasks}
            RemoveCompletedTask={async (task) => await handleRemoveTask(task)}
          />
        )}
      </div>
    </div>
  );
}
