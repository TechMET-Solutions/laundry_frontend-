const Button = ({
  btnText,
  variant = "outline",
  className = "",
  onClick,
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center cursor-pointer justify-center rounded-lg font-sans text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles =
    "h-10 px-6";

  const variants = {
    outline:
      "border border-[#1B76BB] text-[#1B76BB] bg-white hover:bg-blue-50 focus:ring-blue-300",
    primary:
      "border border-[#1B76BB] bg-[#1B76BB] text-white hover:bg-blue-700 focus:ring-blue-300",
    danger:
      "border border-red-600 bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    ghost:
      "border-none bg-transparent text-[#1B76BB] hover:bg-blue-50 focus:ring-blue-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variants[variant]} ${className}`}
    >
      {btnText}
    </button>
  );
};

export default Button;
