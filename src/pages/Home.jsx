import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/configuration";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!authStatus) {
            setPosts([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        appwriteService
            .getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [authStatus]);

    const featuredPost = posts[0];
    const latestPosts = posts.slice(1, 4);
    const morePosts = posts.slice(4);

    useEffect(() => {
        const restoreScroll = location.state?.restoreScroll;

        if (restoreScroll === undefined || loading) {
            return;
        }

        requestAnimationFrame(() => {
            window.scrollTo(0, restoreScroll);
        });
    }, [loading, location.state]);

    if (!authStatus) {
        return (
            <main className="w-full bg-gray-50">
                <section className="border-b border-gray-200">
                    <Container>
                        <div className="flex min-h-[75vh] items-center justify-center py-10 sm:py-16">
                            <div className="mx-auto w-full max-w-3xl text-center">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-600 sm:mb-4 sm:text-sm">
                                    Welcome to the blog
                                </p>

                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                    Share ideas.
                                    <span className="block text-blue-600">
                                        Read stories.
                                    </span>
                                </h1>

                                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-7">
                                    A simple place to write, discover, and share
                                    ideas, experiences, and stories with others.
                                </p>

                                <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
                                    >
                                        Sign In
                                    </button>

                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
                                    >
                                        Create Account
                                    </button>
                                </div>

                                <div className="mt-9 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:mt-12 sm:gap-x-8 sm:text-sm">
                                    <span>Write freely</span>
                                    <span>•</span>
                                    <span>Share your ideas</span>
                                    <span>•</span>
                                    <span>Discover new stories</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        );
    }

    return (
        <main className="w-full bg-gray-50">
            <section className="border-b border-gray-200 bg-white">
                <Container>
                    <div className="py-8 sm:py-16 md:py-20">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 sm:mb-3 sm:text-sm">
                            ThoughtNest
                        </p>

                        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                            Stories, ideas and perspectives worth reading.
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-5 sm:text-lg sm:leading-7">
                            Explore thoughtful articles about technology,
                            psychology, science, nature and everyday life.
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                {loading ? (
                    <div className="py-8 sm:py-12">
                        Loading...
                    </div>
                ) : posts.length > 0 ? (
                    <div className="py-8 sm:py-12">
                        {featuredPost && (
                            <section>
                                <div className="mb-5 sm:mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                        Featured Story
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        A story worth starting with.
                                    </p>
                                </div>

                                <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                        <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 lg:aspect-auto lg:min-h-[420px]">
                                            {featuredPost.featuredImage ? (
                                                <img
                                                    src={appwriteService.getFileView(
                                                        featuredPost.featuredImage
                                                    )}
                                                    alt={featuredPost.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full min-h-[220px] items-center justify-center px-4 text-center text-gray-400 sm:min-h-[280px]">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-10">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                                                Featured Story
                                            </span>

                                            <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:mt-3 sm:text-4xl">
                                                {featuredPost.title}
                                            </h3>

                                            <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
                                                {featuredPost.content
                                                    ?.replace(/<[^>]+>/g, "")
                                                    .slice(0, 220)}
                                                ...
                                            </p>

                                            <div className="mt-5 sm:mt-7">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/post/${featuredPost.$id}`,
                                                            {
                                                                state: {
                                                                    from: location.pathname,
                                                                    scrollY: window.scrollY,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-fit"
                                                >
                                                    Read Story
                                                    <span className="ml-2">→</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        )}

                        {latestPosts.length > 0 && (
                            <section className="mt-10 sm:mt-16">
                                <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7 sm:gap-4">
                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                                            Latest Stories
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Fresh ideas and stories from ThoughtNest.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigate("/all-posts")}
                                        className="hidden shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:block"
                                    >
                                        View all →
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
                                    {latestPosts.map((post) => (
                                        <article
                                            key={post.$id}
                                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md"
                                        >
                                            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                                                {post.featuredImage ? (
                                                    <img
                                                        src={appwriteService.getFileView(
                                                            post.featuredImage
                                                        )}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                        No image
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 sm:p-5">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                                    Story
                                                </span>

                                                <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight text-gray-900 sm:text-xl">
                                                    {post.title}
                                                </h3>

                                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                                    {post.content
                                                        ?.replace(/<[^>]+>/g, "")
                                                        .slice(0, 120)}
                                                    ...
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/post/${post.$id}`,
                                                            {
                                                                state: {
                                                                    from: location.pathname,
                                                                    scrollY: window.scrollY,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="mt-5 text-sm font-semibold text-gray-900 transition hover:text-blue-600"
                                                >
                                                    Read story →
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate("/all-posts")}
                                    className="mt-5 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:mt-6 sm:hidden"
                                >
                                    View all stories
                                </button>
                            </section>
                        )}

                        {morePosts.length > 0 && (
                            <section className="mt-10 pb-10 sm:mt-16 sm:pb-16">
                                <div className="mb-5 sm:mb-7">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                                        Keep reading
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                                        More Stories
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        More ideas and stories from ThoughtNest.
                                    </p>
                                </div>

                                <div className="divide-y divide-gray-200 border-y border-gray-200">
                                    {morePosts.map((post) => (
                                        <article
                                            key={post.$id}
                                            className="group flex flex-col gap-4 py-5 sm:flex-row sm:gap-5 sm:py-6"
                                        >
                                            <div className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:aspect-auto sm:w-52">
                                                {post.featuredImage ? (
                                                    <img
                                                        src={appwriteService.getFileView(
                                                            post.featuredImage
                                                        )}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                        No image
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex min-w-0 flex-1 flex-col justify-center">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                                    Story
                                                </span>

                                                <h3 className="mt-2 text-lg font-semibold leading-tight text-gray-900 transition group-hover:text-blue-600 sm:text-xl">
                                                    {post.title}
                                                </h3>

                                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                                                    {post.content
                                                        ?.replace(/<[^>]+>/g, "")
                                                        .slice(0, 180)}
                                                    ...
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/post/${post.$id}`,
                                                            {
                                                                state: {
                                                                    from: location.pathname,
                                                                    scrollY: window.scrollY,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="mt-3 w-fit text-sm font-semibold text-gray-700 transition hover:text-blue-600"
                                                >
                                                    Read story →
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="py-10 sm:py-20">
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:px-6 sm:py-16">
                            <div className="mx-auto max-w-md">
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                                    <span className="text-2xl">✎</span>
                                </div>

                                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                    No stories yet
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    There aren't any published posts yet.
                                    Start writing and share your first story.
                                </p>

                                <button
                                    onClick={() => navigate("/add-post")}
                                    className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                                >
                                    Write a Post
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </main>
    );
}

export default Home;