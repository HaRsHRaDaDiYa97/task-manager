import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const TaskCard = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] = useState(
    task.title
  );

  const [description, setDescription] =
    useState(task.description);

  const completeHandler = async () => {
    try {
      await api.patch(
        `/tasks/${task._id}/complete`
      );

      toast.success("Task completed");

      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteHandler = async () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/tasks/${task._id}`
      );

      toast.success("Task deleted");

      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const updateHandler = async () => {
    if (!title.trim()) {
      return toast.error(
        "Title is required"
      );
    }

    try {
      await api.put(
        `/tasks/${task._id}`,
        {
          title,
          description,
        }
      );

      toast.success("Task updated");

      setIsEditing(false);

      fetchTasks();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={4}
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={updateHandler}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >
              <FaCheck />
              Save Changes
            </button>

            <button
              onClick={() =>
                setIsEditing(false)
              }
              className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 break-words">
                  {task.title}
                </h2>

                <p className="text-gray-600 mt-2 leading-relaxed break-words">
                  {task.description ||
                    "No description provided"}
                </p>
              </div>

              <span
                className={`self-start px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  task.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.completed
                  ? "Completed"
                  : "Pending"}
              </span>
            </div>

            <div className="border-t pt-4 flex flex-wrap gap-2">
              {!task.completed && (
                <button
                  onClick={completeHandler}
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
                >
                  <FaCheck />
                  Complete
                </button>
              )}

              <button
                onClick={() =>
                  setIsEditing(true)
                }
                className="flex items-center justify-center gap-2 flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
              >
                <FaEdit />
                Edit
              </button>

              <button
                onClick={deleteHandler}
                className="flex items-center justify-center gap-2 flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;