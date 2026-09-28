import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <div className="w-full py-6 sm:py-8">
            <Container>
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-6 sm:mb-8">
                        <p className="mb-2 text-sm font-medium text-blue-600">
                            Create a new post
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Write your story
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                            Share your ideas, experiences, and knowledge with
                            your readers.
                        </p>
                    </div>

                    <div className="w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-6">
                        <PostForm />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default AddPost;