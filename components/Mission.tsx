"use client";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

export default function Missions({ tasks, AddToDone, RemoveTask }) {
  const handleComplete = (task) => {
    AddToDone({ ...task, date: new Date().toISOString() });
  };
  return (
    <div className="flex flex-col gap-2 ">
      {tasks.length == 0 ? (
        <div>
          <h1>Missions are empty</h1>
        </div>
      ) : (
        tasks.length != 0 &&
        tasks.map((task, ind) => (
          <div
            key={ind}
            className="flex flex-row bg-green-400 rounded-xl w-150 p-2"
          >
            <div className="grow">
              <h3 className="text-lg text-white font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="flex flex-row grow-0 p-1 items-center">
              <IoIosCheckmarkCircleOutline
                size={38}
                onClick={() => handleComplete(task)}
              />
              <TiDelete size={45} onClick={() => RemoveTask(task)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
