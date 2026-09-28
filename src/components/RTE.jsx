import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
    name,
    control,
    defaultValue = "",
    label,
}) {
    return (
        <div className="w-full min-w-0">
            {label && (
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}

            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 focus-within:border-blue-400 focus-within:shadow-md">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                            value={value || defaultValue}
                            init={{
                                height: 500,
                                min_height: 350,
                                menubar: true,

                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],

                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",

                                toolbar_mode: "sliding",

                                content_style: `
                                    body {
                                        font-family: Inter, Arial, sans-serif;
                                        font-size: 15px;
                                        line-height: 1.7;
                                        color: #1f2937;
                                        padding: 12px;
                                        margin: 0;
                                        overflow-wrap: break-word;
                                        word-wrap: break-word;
                                    }

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                    }

                                    table {
                                        max-width: 100%;
                                    }
                                `,

                                branding: false,
                                resize: false,
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>

            <p className="mt-2 text-xs leading-5 text-gray-500">
                Write and format your blog content here.
            </p>
        </div>
    );
}