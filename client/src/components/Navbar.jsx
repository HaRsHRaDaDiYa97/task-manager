import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaTasks,
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");

    toast.success("Logged out");

    navigate("/");
  };

  const navLinkClass = ({
    isActive,
  }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
          >
            <FaTasks className="text-blue-600 text-2xl" />

            <span className="text-xl font-bold text-gray-800">
              Task Manager
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/dashboard"
              className={navLinkClass}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={navLinkClass}
            >
              <FaClipboardList />
              Tasks
            </NavLink>

            <NavLink
              to="/create-task"
              className={navLinkClass}
            >
              <FaPlus />
              Add Task
            </NavLink>

            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-96 pb-4"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={navLinkClass}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <FaClipboardList />
              Tasks
            </NavLink>

            <NavLink
              to="/create-task"
              className={navLinkClass}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <FaPlus />
              Add Task
            </NavLink>

            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;