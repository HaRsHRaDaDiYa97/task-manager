import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import api from "../services/api";

import { Helmet } from "react-helmet-async";


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);

    const tasksPerPage = 6;

    const fetchTasks = async () => {
        const res = await api.get("/tasks");
        setTasks(res.data.tasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === "completed")
                return task.completed;

            if (filter === "pending")
                return !task.completed;

            return true;
        })
        .filter((task) =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    const totalPages = Math.ceil(
        filteredTasks.length / tasksPerPage
    );

    const displayedTasks =
        filteredTasks.slice(
            (page - 1) * tasksPerPage,
            page * tasksPerPage
        );

    return (
        <>
            <Helmet>
                <title>My Tasks | Task Manager</title>

                <meta
                    name="description"
                    content="Manage all your tasks. Search, filter, update, delete, and mark tasks as completed."
                />
            </Helmet>
            <Navbar />

            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">
                    All Tasks
                </h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search task..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="border p-3 rounded-lg flex-1"
                    />

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                        className="border p-3 rounded-lg"
                    >
                        <option value="all">
                            All Tasks
                        </option>
                        <option value="completed">
                            Completed
                        </option>
                        <option value="pending">
                            Pending
                        </option>
                    </select>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayedTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            fetchTasks={fetchTasks}
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map(
                        (_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setPage(index + 1)
                                }
                                className={`px-4 py-2 rounded ${page === index + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Tasks;