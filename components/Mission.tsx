"use client";

import { useState } from "react";

export default function Missions({ tasks }) {
  console.log(tasks);
  return (
    <div className="flex justify-center">
      {tasks.map((task, ind) => (
        <div key={ind}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
