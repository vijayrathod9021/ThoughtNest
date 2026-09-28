import { useLocation, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/configuration";

function PostCard({ $id, title, featuredImage }) {
    const imageUrl = featuredImage
        ? appwriteService.getFileView(featuredImage)
        : null;

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${$id}`, {
            state: {
                from: location.pathname,
                scrollY: window.scrollY,
            },
        });
    };

    return (
        <button
            onClick={handleClick}
            className="group block w-full text-left"
        >
            <article className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-400">
                            No image
                        </div>
                    )}
                </div>

                <div className="p-4 sm:p-5">
                    <h2 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-lg">
                        {title}
                    </h2>

                    <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
                        <span className="text-xs font-medium text-gray-500 sm:text-sm">
                            Read article
                        </span>

                        <span className="shrink-0 text-lg text-gray-400 transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </div>
                </div>
            </article>
        </button>
    );
}

export default PostCard;