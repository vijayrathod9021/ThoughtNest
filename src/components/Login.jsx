import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index.js";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice.js";
import authService from "../appwrite/auth.js";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-8 sm:py-12">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

                    <div className="mb-6 flex justify-center">
                        <Link
                            to="/"
                            className="inline-block"
                        >
                            <Logo width="180px" />
                        </Link>
                    </div>

                    <div className="text-center">
                        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            Welcome back
                        </h2>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-gray-500">
                            Sign in to continue to your blog account
                        </p>
                    </div>

                    {error && (
                        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-3 sm:px-4">
                            <p className="break-words text-center text-sm leading-5 text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(login)}
                        className="mt-6 sm:mt-7"
                    >
                        <div className="space-y-5">

                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    },
                                })}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />

                            <Button
                                type="submit"
                                className="w-full py-2.5 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm leading-5 text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>

                <p className="mt-5 px-4 text-center text-xs leading-5 text-gray-400">
                    Share your thoughts. Build your audience.
                </p>
            </div>
        </div>
    );
}

export default Login;