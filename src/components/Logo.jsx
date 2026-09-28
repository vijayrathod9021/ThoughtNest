function Logo({ width = "100px" }) {
    return (
        <div
            style={{ width }}
            className="flex min-w-0 items-center gap-2 font-bold tracking-tight text-gray-900"
        >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg text-white">
                T
            </span>

            <span className="truncate text-lg sm:text-xl">
                ThoughtNest
            </span>
        </div>
    );
}

export default Logo;