import { useEffect, useState } from "react";

const ToggleButton = ({ label, label2, checked = false, onChange }) => {
  const [isOn, setIsOn] = useState(checked);

  useEffect(() => {
    setIsOn(checked);
  }, [checked]);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="flex gap-1">
      <div
        id="active"
        className={`w-14 h-7 rounded-full cursor-pointer relative transition-colors duration-300 ${
          isOn ? "bg-[#369CEB]" : "bg-gray-400"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </div>
      <label htmlFor="active" className=" text-gray-700">
        {" "}
        {isOn ? `${label}` : `${label2}`}
      </label>
    </div>
  );
};

export default ToggleButton;
