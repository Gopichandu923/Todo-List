"use client";
import { TiDelete } from "react-icons/ti";

export default function Done({ completedTasks, RemoveCompletedTask }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4 w-150">
      {completedTasks.length === 0 ? (
        <p>No completed missions yet.</p>
      ) : (
        completedTasks.map((task, ind) => (
          <div
            key={ind}
            className="flex flex-row bg-green-400 rounded-xl p-3 w-150 items-center "
          >
            <div className="flex flex-col grow ">
              <h3 className="text-lg text-white font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-end">
                Completed at: {task.date ? task.date : "—"}
              </p>
            </div>
            <div className="grow-0">
              <TiDelete size={45} onClick={() => RemoveCompletedTask(task)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
