import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select } from "../index";
import appwriteService from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        control,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            removeImage: false,
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [imagePreview, setImagePreview] = useState(null);
    const selectedImage = watch("image");
    const [imageRemoved, setImageRemoved] = useState(false);

    React.useEffect(() => {
        if (selectedImage && selectedImage[0]) {
            const imageUrl = URL.createObjectURL(selectedImage[0]);
            setImagePreview(imageUrl);

            return () => URL.revokeObjectURL(imageUrl);
        }

        setImagePreview(null);
    }, [selectedImage]);

    const submit = async (data) => {
        if (post) {
            const file = data.image?.[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            if (file && post.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image?.[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            const dbPost = await appwriteService.createPost({
                ...data,
                featuredImage: file ? file.$id : "",
                userID: userData.$id,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue(
                    "slug",
                    slugTransform(value.title),
                    { shouldValidate: true }
                );
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setValue, slugTransform, watch]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="w-full"
        >
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-8">

                <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">

                        <div className="mb-6 sm:mb-8">
                            <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                                {post ? "Edit your post" : "Create a new post"}
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                {post
                                    ? "Update your article and keep your readers engaged."
                                    : "Share your thoughts, ideas and stories with your readers."
                                }
                            </p>
                        </div>

                        <div className="space-y-5 sm:space-y-6">

                            <div>
                                <Input
                                    label="Title"
                                    placeholder="Give your post a meaningful title"
                                    className="mb-1"
                                    {...register("title", {
                                        required: true,
                                    })}
                                />

                                <p className="text-xs leading-5 text-gray-400">
                                    Keep it clear and easy to understand.
                                </p>
                            </div>

                            <div>
                                <Input
                                    label="Slug"
                                    placeholder="your-post-slug"
                                    className="mb-1"
                                    {...register("slug", {
                                        required: true,
                                    })}
                                    onInput={(e) => {
                                        setValue(
                                            "slug",
                                            slugTransform(e.currentTarget.value),
                                            { shouldValidate: true }
                                        );
                                    }}
                                />

                                <p className="text-xs leading-5 text-gray-400">
                                    This will be used in your post URL.
                                </p>
                            </div>

                            <div className="min-w-0">
                                <RTE
                                    label="Content"
                                    name="content"
                                    control={control}
                                    defaultValue={getValues("content")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-w-0 lg:col-span-1">
                    <div className="space-y-5 sm:space-y-6">

                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Publish
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage your post settings.
                            </p>

                            <div className="mt-5 sm:mt-6">
                                <Select
                                    options={["active", "inactive"]}
                                    label="Status"
                                    className="mb-4"
                                    {...register("status", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <Button
                                type="submit"
                                bgColor={
                                    post
                                        ? "bg-green-600"
                                        : "bg-blue-600"
                                }
                                className="mt-2 w-full cursor-pointer transition hover:opacity-90"
                            >
                                {post ? "Update Post" : "Publish Post"}
                            </Button>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Featured Image
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Add an image that represents your post.
                                </p>
                            </div>

                            <Input
                                label=""
                                type="file"
                                className="mb-4 w-full cursor-pointer"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image")}
                            />

                            {(imagePreview ||
                                (post?.featuredImage && !imageRemoved)) && (
                                    <div className="mb-4 w-full overflow-hidden rounded-lg">
                                        <img
                                            src={
                                                imagePreview ||
                                                appwriteService.getFileView(
                                                    post.featuredImage
                                                )
                                            }
                                            alt={post?.title || "Selected image"}
                                            className="h-auto max-h-[360px] w-full object-cover"
                                        />
                                    </div>
                                )}

                            {post?.featuredImage && (
                                <Button
                                    type="button"
                                    bgColor="bg-red-600"
                                    className="mt-3 w-full hover:bg-red-700 sm:w-auto"
                                    onClick={() => {
                                        setValue("removeImage", true);
                                        setValue("image", null);
                                        setImageRemoved(true);
                                    }}
                                >
                                    Remove Image
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PostForm;