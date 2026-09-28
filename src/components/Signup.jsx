import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const create = async (formData) => {
        setError("");

        try {
            const session = await authService.createAccount(formData);

            if (session) {
                const currentUser = await authService.getCurrentUser();

                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-8 sm:py-10">
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
                            Create an account
                        </h2>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-gray-500">
                            Start sharing your thoughts with the community.
                        </p>
                    </div>

                    <p className="mt-4 text-center text-sm leading-5 text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                    {error && (
                        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-3 sm:px-4">
                            <p className=" text-center text-sm leading-5 text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(create)}
                        className="mt-6 sm:mt-8"
                    >
                        <div className="space-y-5">

                            <Input
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", {
                                    required: true,
                                })}
                            />

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
                                placeholder="Create a password"
                                {...register("password", {
                                    required: true,
                                })}
                            />

                            <Button
                                type="submit"
                                className="w-full cursor-pointer py-2.5 font-semibold transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>

                <p className="mt-5 px-4 text-center text-xs leading-5 text-gray-400">
                    By creating an account, you can start creating and sharing posts.
                </p>
            </div>
        </div>
    );
}

export default Signup;