"use client";

import { useState } from "react";

export default function Missions({ tasks, AddToDone }) {
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
            className="flex flex-row bg-green-400 rounded-xl w-150 p-3"
          >
            <div className="grow">
              <h3 className="text-lg text-white font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <button
              className="grow-0 bg-white rounded-4xl text-sm p-1"
              onClick={() => handleComplete(task)}
            >
              Completed
            </button>
          </div>
        ))
      )}
    </div>
  );
}
