"use client";

import { TiDelete } from "react-icons/ti";

interface Task {
  id: string;
  title: string;
  description: string;
  completedAt?: string; // optional completed date
}

export default function Done({ Tasks, RemoveCompletedTask }) {
  console.log(Tasks);
  return (
    <div className="flex flex-col items-center gap-4 mt-4 w-150">
      {Tasks.length === 0 ? (
        <p>No completed missions yet.</p>
      ) : (
        Tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-row bg-green-400 rounded-xl p-3 w-150 items-center"
          >
            <div className="flex flex-col grow">
              <h3 className="text-lg text-white font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-end">Completed at: {task.completedAt}</p>
            </div>
            <div className="grow-0">
              <TiDelete
                size={45}
                className="cursor-pointer"
                onClick={() => RemoveCompletedTask(task)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
