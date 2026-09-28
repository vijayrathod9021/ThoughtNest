import React from "react";

import { Link } from "react-router-dom";

import Logo from "../Logo";

function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link
                            to="/"
                            className="inline-block transition-opacity hover:opacity-80"
                        >
                            <Logo width="180px" />
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                            A simple place to read, write, and share ideas.
                            Discover thoughtful articles and stories from the
                            ThoughtNest community.
                        </p>

                        <p className="mt-5 text-xs text-gray-500 sm:mt-6 sm:text-sm">
                            © {new Date().getFullYear()} ThoughtNest. All rights reserved.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                            Explore
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/all-posts"
                                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                >
                                    All Posts
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/add-post"
                                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                >
                                    Write a Post
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                            Account
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                >
                                    Sign In
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/signup"
                                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                >
                                    Create Account
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 border-t border-gray-200 pt-5 text-xs text-gray-500 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-6 sm:text-sm">
                    <p>Built with React & Appwrite.</p>

                    <p>Read. Write. Share.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;