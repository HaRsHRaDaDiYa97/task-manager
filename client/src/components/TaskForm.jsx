import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Title is required");
    }

    try {
      setLoading(true);

      await api.post("/tasks", {
        title,
        description,
      });

      toast.success("Task Created");

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Add New Task
      </h2>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          rows={4}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {loading
            ? "Creating..."
            : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;