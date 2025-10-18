"use client";
import { useEffect } from "react";

export default function Done({ completedTasks }) {
  // Optional: log whenever completedTasks changes
  useEffect(() => {
    console.log("Completed tasks updated:", completedTasks);
  }, [completedTasks]);

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {completedTasks.length === 0 ? (
        <p>No completed missions yet.</p>
      ) : (
        completedTasks.map((task, ind) => (
          <div
            key={ind}
            className="p-4 bg-green-100 border border-green-400 rounded-md shadow-md w-80 text-center"
          >
            <h1 className="text-lg font-semibold text-green-800">
              {task.title}
            </h1>
            <p className="text-gray-700">{task.description}</p>
            <span className="text-sm text-gray-500">
              Completed at: {task.date ? task.date : "—"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
