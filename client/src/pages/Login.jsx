import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            return toast.error("Email is required");
        }

        if (!formData.password.trim()) {
            return toast.error("Password is required");
        }

        try {
            setLoading(true);

            const res = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            toast.success("Login successful");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <>

            <Helmet>
                <title>Login | Task Manager</title>
                <meta
                    name="description"
                    content="Login to your Task Manager account."
                />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-center text-gray-500 mb-6">
                        Login to continue
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block mb-1 font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter password"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center mt-5 text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;