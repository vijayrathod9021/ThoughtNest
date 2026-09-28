import React, { useId } from "react";

function Select(
    {
        options,
        label,
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
                    htmlFor={id}
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    {label}
                </label>
            )}

            <select
                {...props}
                id={id}
                ref={ref}
                className={`
                    w-full rounded-xl border border-gray-200
                    bg-white px-3 py-2.5
                    text-sm text-gray-900
                    outline-none
                    transition-all duration-200
                    focus:border-blue-400
                    focus:ring-2 focus:ring-blue-100
                    ${className}
                `}
            >
                {options?.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);