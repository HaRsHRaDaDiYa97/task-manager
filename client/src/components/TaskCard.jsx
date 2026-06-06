import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

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
    <div className="bg-white shadow rounded-xl p-5">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-lg p-2 mb-3"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={3}
            className="w-full border rounded-lg p-2 mb-3"
          />

          <div className="flex gap-2">
            <button
              onClick={updateHandler}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() =>
                setIsEditing(false)
              }
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold">
                {task.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
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

          <div className="flex flex-wrap gap-2 mt-5">
            {!task.completed && (
              <button
                onClick={completeHandler}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Complete
              </button>
            )}

            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={deleteHandler}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;