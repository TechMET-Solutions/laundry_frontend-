const Button = ({
  btnText,
  variant = "outline",
  className = "",
}) => {
  const baseStyles =
    "w-auto min-w-[28] sm:min-w-[32] px-4 py-2 rounded-md font-sans font-semibold text-center outline-none transition";

  const variants = {
    outline:
      "border-2 border-[#1B76BB] bg-white text-[#1B76BB]",
    primary:
      "border-2 border-[#1B76BB] bg-[#1B76BB] text-white",
    danger:
      "border-2 border-red-600 bg-red-600 text-white",
    ghost:
      "border-0 bg-transparent text-[#1B76BB]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {btnText}
    </button>
  );
};

export default Button;
