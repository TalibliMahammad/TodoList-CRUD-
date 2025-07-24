// src/components/Dropdown.jsx
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";

const Dropdown = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["All", "Complete", "Incomplete"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
  console.log(selected);
  

  return (
    <div className="relative">
      <div
        className="bg-violet-700 flex items-center w-[200px] p-5 justify-between h-[50px] text-white rounded-lg border border-violet-600 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[20px] font-medium">{selected}</span>
        <FaAngleDown className="text-white text-[20px]" />
      </div>

      {isOpen && (
        <ul className="absolute z-10 top-[60px] w-full bg-white shadow-lg rounded-lg text-black">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-violet-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
