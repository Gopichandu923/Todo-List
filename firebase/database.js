"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "./config";

export const addTask = async (title, description, userId) => {
  try {
    const docRef = await adminDb.collection("tasks").add({
      title,
      description,
      isCompleted: false,
      completedAt: null,
      userId,
    });
    console.log("Task added with ID:", docRef.id);
    revalidatePath("/");
  } catch (err) {
    console.error("Error adding task:", err);
  }
};

export const deleteTask = async (id) => {
  try {
    await adminDb.collection("tasks").doc(id).delete();
    console.log("Task deleted:", id);
    revalidatePath("/");
  } catch (err) {
    console.error("Error deleting task:", err);
  }
};

export const updateTask = async (id) => {
  try {
    await adminDb.collection("tasks").doc(id).update({
      isCompleted: true,
      completedAt: new Date().toLocaleString(),
    });
    console.log("Task updated:", id);
    revalidatePath("/");
  } catch (err) {
    console.error("Error updating task:", err);
  }
};

export const getTasks = async (userId) => {
  try {
    const snapshot = await adminDb.collection("tasks")
      .where("userId", "==", userId)
      .where("isCompleted", "==", false)
      .get();
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error getting tasks:", err);
    return [];
  }
};

export const getCompletedTasks = async (userId) => {
  try {
    const snapshot = await adminDb.collection("tasks")
      .where("userId", "==", userId)
      .where("isCompleted", "==", true)
      .get();

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error getting completed tasks:", err);
    return [];
  }
};
