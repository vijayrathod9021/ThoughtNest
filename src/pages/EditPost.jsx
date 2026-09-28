import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/configuration";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPost(slug).then((post) => {
            if (post) {
                setPost(post);
            } else {
                navigate("/");
            }
        });
    }, [slug, navigate]);


    return post ? (
        <main className="min-h-screen w-full bg-gray-50 py-6 sm:py-10">
            <Container>
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <p className="mb-2 text-xs font-medium text-blue-600 sm:text-sm">
                            Blog Management
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Edit Post
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                            Update your blog post, change its featured image,
                            edit the content, or modify its publishing status.
                        </p>
                    </div>

                    <Link
                        to={`/post/${post.$id}`}
                        className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-100 sm:w-fit"
                    >
                        ← View Post
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-4 py-4 sm:px-7">
                        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                            Post Details
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-gray-500">
                            Make your changes below and save when you're done.
                        </p>
                    </div>

                    <div className="p-3 sm:p-7">
                        <PostForm post={post} />
                    </div>
                </div>
            </Container>
        </main>
    ) : (
        <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                <p className="text-sm text-gray-500">
                    Loading post...
                </p>
            </div>
        </main>
    );
}

export default EditPost;