"use client";
export default function Home() {
  return (
    <div className="justify-items-center">
      <div className="flex flex-row justify-center  p-2 bg-orange-400 rounded-md">
        <button className="p-2  rounded-xl">Missions</button>
        <button className="p-2  rounded-xl">Done</button>
      </div>
      <div>
        <h1>Task 1</h1>
        <h1>Task 2</h1>
      </div>
    </div>
  );
}
