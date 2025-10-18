export default function Done({ CompletedTasks }) {
  return (
    <div>
      {CompletedTasks.map((task, ind) => {
        return (
          <div key={ind}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <span>
              <p>at {task.time} </p>
            </span>
          </div>
        );
      })}
    </div>
  );
}
