"use client";

import { useState } from "react";

export default function Missions({ tasks, AddToDone }) {
  const handleComplete = (task) => {
    AddToDone({ ...task, date: new Date().toISOString });
  };
  return (
    <div className="flex justify-center">
      {tasks.map((task, ind) => (
        <div key={ind}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleComplete(task)}>Completed</button>
        </div>
      ))}
    </div>
  );
}
