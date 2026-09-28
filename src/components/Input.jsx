import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-2 block text-sm font-medium text-gray-700"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                ref={ref}
                id={id}
                className={`
                    w-full rounded-lg
                    border border-gray-300
                    bg-white
                    px-4 py-2.5
                    text-sm text-gray-900
                    placeholder:text-gray-400
                    outline-none
                    transition-all duration-200
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    disabled:cursor-not-allowed
                    disabled:bg-gray-100
                    disabled:text-gray-500
                    ${className}
                `}
                {...props}
            />
        </div>
    );
});

export default Input;