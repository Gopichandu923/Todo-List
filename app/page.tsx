import TaskList from "../components/TaskList";
import { getTasks, getCompletedTasks } from "../firebase/database";
import { getSessionAction } from "./auth";
import { redirect } from "next/navigation";

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  completedAt?: string;
  userId?: string;
}

export default async function Home() {
  const session = await getSessionAction();

  if (!session) {
    redirect("/login");
  }

  const userId = session.uid;

  const questions = await getTasks(userId) || [];
  const completed = await getCompletedTasks(userId) || [];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <TaskList
        initialTasks={questions as Task[]}
        initialCompletedTasks={completed as Task[]}
        userId={userId}
      />
    </div>
  );
}
