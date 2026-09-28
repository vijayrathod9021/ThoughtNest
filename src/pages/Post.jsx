
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        post && userData
            ? post.userID === userData.$id
            : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const status = await appwriteService.deletePost({
                slug: post.$id,
            });

            if (status) {
                if (post.featuredImage) {
                    await appwriteService.deleteFile(
                        post.featuredImage
                    );
                }

                navigate("/");
            }
        } catch (error) {
            console.error("DELETE POST ERROR:", error);
        }
    };

    return post ? (
        <main className="w-full bg-gray-50 py-6 sm:py-10 lg:py-14">
            <Container>
                <article className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="px-4 pt-5 sm:px-8 sm:pt-8">
                        <Link
                            to={location.state?.from || "/"}
                            state={{
                                restoreScroll:
                                    location.state?.scrollY,
                            }}
                            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                        >
                            ← Back to posts
                        </Link>
                    </div>

                    <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden bg-gray-100 sm:mx-8 sm:mt-6 sm:w-auto sm:rounded-xl">
                        {post.featuredImage ? (
                            <img
                                src={appwriteService.getFileView(
                                    post.featuredImage
                                )}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                No image
                            </div>
                        )}
                    </div>

                    {isAuthor && (
                        <div className="flex flex-wrap items-center justify-end gap-2 px-4 pt-4 sm:px-8">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-600"
                                    className="px-4 py-2 text-sm hover:bg-green-700"
                                >
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-600"
                                className="px-4 py-2 text-sm hover:bg-red-700"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}

                    <header className="px-4 pb-6 pt-6 sm:px-12 sm:pb-8 sm:pt-10">
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:mb-5 sm:gap-3 sm:text-sm">
                            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                                Blog
                            </span>

                            {post.status && (
                                <span className="text-gray-400">
                                    • {post.status}
                                </span>
                            )}
                        </div>

                        <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            {post.title}
                        </h1>
                    </header>

                    <div className="min-w-0 border-t border-gray-100 px-4 py-6 sm:px-12 sm:py-10">
                        <div
                            className="
                                browser-css
                                min-w-0
                                max-w-3xl
                                wrap-break-word
                                text-gray-700
                                [&_img]:h-auto
                                [&_img]:max-w-full
                                [&_pre]:max-w-full
                                [&_pre]:overflow-x-auto
                                [&_table]:block
                                [&_table]:max-w-full
                                [&_table]:overflow-x-auto
                            "
                        >
                            {parse(post.content)}
                        </div>
                    </div>
                </article>
            </Container>
        </main>
    ) : (
        <main className="flex min-h-96 items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                <p className="text-sm text-gray-500">
                    Loading post...
                </p>
            </div>
        </main>
    );
}