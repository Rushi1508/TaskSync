const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.send("API is running");
});

// DB test
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("DB connection failed");
  }
});

// ===== TASK ROUTES =====

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
});

// GET task by ID
app.get("/api/tasks/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// CREATE task
app.post("/api/tasks", async (req, res) => {
  const { title, description, status, priority } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title, description, status, priority) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, status, priority]
  );

  res.json(result.rows[0]);
});

// UPDATE task
app.put("/api/tasks/:id", async (req, res) => {
  const { title, description, status, priority } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET title=$1, description=$2, status=$3, priority=$4, updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *",
    [title, description, status, priority, req.params.id]
  );

  res.json(result.rows[0]);
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
  res.json({ message: "Task deleted" });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

