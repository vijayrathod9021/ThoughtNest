import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/configuration";
import { useLocation } from "react-router-dom";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            setLoading(false);
            return;
        }

        setLoading(true);

        appwriteService
            .getMyPosts(userData.$id)
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userData]);

    useEffect(() => {
        const restoreScroll = location.state?.restoreScroll;

        if (restoreScroll === undefined || loading) {
            return;
        }

        requestAnimationFrame(() => {
            window.scrollTo(0, restoreScroll);
        });
    }, [loading, location.state]);

    return (
        <div className="w-full bg-gray-50 py-8 sm:py-12 lg:py-16">
            <Container>
                <div className="mb-8 sm:mb-10">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                                Your writing
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                My Posts
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-3 sm:text-base">
                                Manage and revisit the stories you have created.
                            </p>
                        </div>

                        {!loading && posts.length > 0 && (
                            <p className="shrink-0 text-sm font-medium text-gray-500">
                                {posts.length}{" "}
                                {posts.length === 1 ? "post" : "posts"}
                            </p>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                            >
                                <div className="aspect-[16/10] w-full animate-pulse bg-gray-200" />

                                <div className="p-4 sm:p-5">
                                    <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200 sm:h-6" />

                                    <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />

                                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

                                    <div className="mt-5 flex justify-between sm:mt-6">
                                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                                        <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-gray-200" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                {...post}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 sm:min-h-[360px] sm:px-6 sm:py-12">
                        <div className="w-full max-w-md text-center">
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                                ✎
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                You haven't created any posts yet
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Start writing your first story and it will appear
                                here.
                            </p>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;