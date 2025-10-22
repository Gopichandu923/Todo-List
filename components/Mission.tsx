"use client";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

interface MissionsProps {
  tasks: Task[];
  AddToDone: (task: Task) => void;
  RemoveTask: (task: Task) => void;
}

export default function Missions({
  tasks,
  AddToDone,
  RemoveTask,
}: MissionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {tasks.length === 0 ? (
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <h1 className="text-lg font-semibold text-gray-700">
            Missions are empty
          </h1>
        </div>
      ) : (
        tasks.map((task) => (
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
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {task.title}
              </h3>
              <p className="text-white/90 mt-1">{task.description}</p>
            </div>

            {/* Action Icons */}
            <div className="flex flex-row gap-3 mt-2 sm:mt-0 items-center">
              <IoIosCheckmarkCircleOutline
                size={36}
                className="cursor-pointer text-white hover:text-green-200 transition-colors"
                onClick={() => AddToDone(task)}
              />
              <TiDelete
                size={36}
                className="cursor-pointer text-white hover:text-red-200 transition-colors"
                onClick={() => RemoveTask(task)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
