import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import api from "../services/api";
import toast from "react-hot-toast";

import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <>

<Helmet>
  <title>Dashboard | Task Manager</title>

  <meta
    name="description"
    content="View task statistics, progress, completed tasks, and pending tasks in your Task Manager dashboard."
  />
</Helmet>

      <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Total Tasks</h3>
            <p className="text-3xl font-bold">
              {totalTasks}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {pendingTasks}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Completed Tasks</h3>
            <p className="text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-8">
          <div className="flex justify-between mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-5">
          Recent Tasks
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.slice(0, 5).map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              fetchTasks={fetchTasks}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;