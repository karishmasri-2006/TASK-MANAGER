const express = require("express");
const db = require("../config/db");

const router = express.Router();


// CREATE TASK
router.post("/", (req, res) => {

  const { title, description, status, user_id } = req.body;

  const sql =
    "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [title, description, status, user_id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Task created successfully",
      });

    }
  );
});


// GET TASKS
router.get("/", (req, res) => {

  const sql = "SELECT * FROM tasks";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });
});


// UPDATE TASK STATUS
router.put("/:id", (req, res) => {

  const { status } = req.body;

  const sql =
    "UPDATE tasks SET status = ? WHERE id = ?";

  db.query(
    sql,
    [status, req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Task updated successfully",
      });

    }
  );
});


// DELETE TASK
router.delete("/:id", (req, res) => {

  const sql =
    "DELETE FROM tasks WHERE id = ?";

  db.query(
    sql,
    [req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Task deleted successfully",
      });

    }
  );
});

module.exports = router;