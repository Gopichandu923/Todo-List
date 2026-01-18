"use server";

import { addTask, updateTask, deleteTask } from "../firebase/database";

export async function handleAdd(title: string, description: string, userId: string) {
    await addTask(title, description, userId);
}

export async function handleCompleteTask(taskId: string) {
    await updateTask(taskId);
}

export async function handleRemoveTask(taskId: string) {
    await deleteTask(taskId);
}
