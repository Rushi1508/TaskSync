import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description: "Added from UI",
        status: "todo",
        priority: "medium",
      }),
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "todo" ? "done" : "todo";

    await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
      }),
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>TaskSync</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ marginRight: "10px" }}
      />
      <button onClick={addTask}>Add</button>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>

          <button onClick={() => toggleStatus(task)}>
            Toggle Status
          </button>

          <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;