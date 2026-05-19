import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    user_id: 1,
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Add Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/tasks",
        formData
      );

      alert("Task Added Successfully");

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        status: "Pending",
        user_id: 1,
      });

    } catch (error) {
      console.log(error);
      alert("Failed to Add Task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      alert("Task Deleted");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // Update Status
  const updateStatus = async (id, currentStatus) => {

    const newStatus =
      currentStatus === "Pending"
        ? "Completed"
        : "Pending";

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status: newStatus,
        }
      );

      alert("Task Status Updated");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* NAVBAR */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-blue-600">
          Task Manager
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >

        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>

      </form>

      {/* TASK LIST */}
      <div className="grid gap-6 md:grid-cols-2">

        {
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-xl shadow-md"
            >

              <h2 className="text-2xl font-bold text-blue-600">
                {task.title}
              </h2>

              <p className="text-gray-700 mt-3">
                {task.description}
              </p>

              <p
                className={`mt-3 font-bold ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {task.status}
              </p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    updateStatus(task.id, task.status)
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Toggle Status
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Dashboard;