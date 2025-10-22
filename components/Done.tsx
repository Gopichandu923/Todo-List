"use client";

import { TiDelete } from "react-icons/ti";

interface Task {
  id: string;
  title: string;
  description: string;
  completedAt?: string;
}

interface DoneProps {
  Tasks: Task[];
  RemoveCompletedTask: (task: Task) => void | Promise<void>;
}

export default function Done({ Tasks, RemoveCompletedTask }: DoneProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4 w-full">
      {Tasks.length === 0 ? (
        <p className="text-center text-gray-600">No completed missions yet.</p>
      ) : (
        Tasks.map((task) => (
          <div
            key={task.id}
            className="
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center
              bg-green-400
              rounded-xl
              p-4
              w-full
              sm:w-[500px]
              md:w-[600px]
              lg:w-[700px]
              transition transform hover:scale-[1.02]
            "
          >
            {/* Task Info */}
            <div className="flex flex-col flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {task.title}
              </h3>
              <p className="text-white/90 mt-1">{task.description}</p>
              {task.completedAt && (
                <p className="text-white text-sm mt-1 text-right sm:text-left">
                  Completed at: {task.completedAt}
                </p>
              )}
            </div>

            {/* Delete Icon */}
            <div className="flex-shrink-0 mt-2 sm:mt-0 ml-2">
              <TiDelete
                size={36}
                className="cursor-pointer text-white hover:text-red-200 transition-colors"
                onClick={() => RemoveCompletedTask(task)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
