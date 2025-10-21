"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Mission from "@/components/Mission";
import Done from "@/components/Done";
import { useAuth } from "../contexts/AuthContext";
import { addTask, updateTask, deleteTask } from "../firebase/database";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  completedAt?: string;
}

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const [isMissions, setMissions] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
  });

  // 🔹 Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // 🔹 Fetch tasks when logged in
  useEffect(() => {
    if (!user) return;

    const q1 = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      where("isCompleted", "==", false)
    );

    const unsubscribe1 = onSnapshot(q1, (snapshot) => {
      setTasks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task)));
    });

    const q2 = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      where("isCompleted", "==", true)
    );

    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      setCompletedTasks(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task))
      );
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [user]);

  // 🔹 Add new task
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    await addTask(newTask.title, newTask.description, user.uid);
    setNewTask({ id: "", title: "", description: "" });
  };

  // 🔹 Mark as completed
  const handleCompleteTask = async (task: Task) => {
    if (!user) {
      router.push("/login");
      return;
    }
    await updateTask(task.id);
  };

  // 🔹 Delete from missions
  const handleRemoveTask = async (task: Task) => {
    if (!user) {
      router.push("/login");
      return;
    }
    await deleteTask(task.id);
  };

  // 🔹 Delete completed
  const handleRemoveCompletedTask = async (task: Task) => {
    if (!user) {
      router.push("/login");
      return;
    }
    await deleteTask(task.id);
  };

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

      {/* 🔹 Toggle Missions / Done */}
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

      {/* 🔹 Task Lists */}
      <div className="mt-4">
        {isMissions ? (
          <Mission
            tasks={tasks}
            AddToDone={handleCompleteTask}
            RemoveTask={handleRemoveTask}
          />
        ) : (
          <Done
            Tasks={completedTasks}
            RemoveCompletedTask={handleRemoveCompletedTask}
          />
        )}
      </div>
    </div>
  );
}
