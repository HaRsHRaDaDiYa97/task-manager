import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Task Manager
        </h1>

        <div className="flex gap-4 items-center">
          <Link
            to="/dashboard"
            className="font-medium hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="font-medium hover:text-blue-600"
          >
            Tasks
          </Link>

          <Link
            to="/create-task"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </Link>

          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;