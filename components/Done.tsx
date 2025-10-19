"use client";
import { useEffect } from "react";

export default function Done({ completedTasks }) {
  // Optional: log whenever completedTasks changes
  useEffect(() => {
    console.log("Completed tasks updated:", completedTasks);
  }, [completedTasks]);

  return (
    <div className="flex flex-col items-center gap-4 mt-4 w-150">
      {completedTasks.length === 0 ? (
        <p>No completed missions yet.</p>
      ) : (
        completedTasks.map((task, ind) => (
          <div
            key={ind}
            className="flex flex-col bg-green-400 rounded-xl p-3 w-150"
          >
            <h3 className="text-lg text-white font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-end">
              Completed at: {task.date ? task.date : "—"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
