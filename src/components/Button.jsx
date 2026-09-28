function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                inline-flex items-center justify-center
                px-4 py-2
                rounded-lg
                font-medium
                transition-all duration-200
                hover:opacity-90
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${bgColor}
                ${textColor}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;