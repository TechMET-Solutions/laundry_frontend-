import { useState } from "react";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
     
  };

  return (
     <div className="flex gap-1">
    <div
    id="active"
      className={`w-14 h-7 rounded-full cursor-pointer relative transition-colors duration-300 ${
        isOn ? "bg-[#342eee]" : "bg-gray-400"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      />
      
    </div>
    <label htmlFor="active"> { isOn? "is active ?":"not active" }</label>
   </div>
  );
};

export default ToggleButton;
