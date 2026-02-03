import React from "react";

const variants = {
    primary: "ring-2 bg-white ring-blue-400 hover:bg-blue-50",
    download: "ring-red-400 bg-green-600 hover:bg-green-700 text-white",
    print: "ring-red-400 bg-orange-500 text-white hover:bg-orange-600",
};

const NavButton = ({
    children,
    onClick,
    variant = "primary",
    className = "",
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
         px-4 py-2 rounded-full 
        text-sm flex items-center gap-1
        transition active:scale-95
        ${variants[variant]}
        ${className}
      `}

        >
            {children}
        </button>
    );
};

export default NavButton;
