import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const CreateTask = () => {
  return (
    <>
      <Helmet>
        <title>Create Task | Task Manager</title>

        <meta
          name="description"
          content="Create a new task and organize your daily work efficiently."
        />
      </Helmet>
      <Navbar />

      <div className="max-w-3xl mx-auto p-4">
        <TaskForm />
      </div>
    </>
  );
};

export default CreateTask;