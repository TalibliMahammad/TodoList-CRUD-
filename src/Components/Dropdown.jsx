import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";

const Dropdown = ({ selected, setSelected, options = ["All", "Complete", "Incomplete"], widthClass = "w-[200px]" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
 
  

  return (
    <div className="relative">
      <div
        className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center ${widthClass} px-5 justify-between h-[56px] text-white rounded-xl border border-white/20 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{selected}</span>
        <FaAngleDown className={`text-white text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <ul className="absolute z-20 top-[64px] w-full backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 shadow-2xl rounded-xl text-gray-800 dark:text-white border border-white/20 overflow-hidden animate-fade-in">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-5 py-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer transition-all duration-200 font-medium ${
                selected === option ? 'bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50' : ''
              }`}
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
