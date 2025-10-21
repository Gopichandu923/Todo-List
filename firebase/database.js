import { db } from "./config";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addTask = async (title, description, userId) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      description,
      isCompleted: false,
      completedAt: null,
      userId,
    });
    console.log(docRef);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (id) => {
  try {
    const docRef = await deleteDoc(doc(db, "tasks", id));
    console.log(docRef);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (id) => {
  try {
    const docRef = await updateDoc(doc(db, "tasks", id), {
      isCompleted: true,
      completedAt: new Date().toLocaleString(),
    });
    console.log(docRef);
  } catch (err) {
    console.log(err);
  }
};

export const getTasks = async (userId) => {
  try {
    const docRef = await getDocs(
      query(
        collection(db, "tasks"),
        where("userId", "==", userId),
        where("isCompleted", "==", false)
      )
    );
    const tasks = docRef.docs.map((d) => ({ id: d.id, ...d.data() }));
    return tasks;
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedTasks = async (userId) => {
  try {
    const docRef = await getDocs(
      query(
        collection(db, "tasks"),
        where("userId", "==", userId),
        where("isCompleted", "==", true)
      )
    );
    const tasks = docRef.docs.map((d) => ({ id: d.id, ...d.data() }));
    return tasks;
  } catch (err) {
    console.log(err);
  }
};
