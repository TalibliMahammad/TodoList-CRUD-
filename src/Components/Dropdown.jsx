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
        className={`bg-white/10 hover:bg-white/20 flex items-center ${widthClass} px-4 justify-between h-10 text-white rounded-lg border border-white/20 cursor-pointer transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium truncate">{selected}</span>
        <FaAngleDown className={`text-white/80 text-sm shrink-0 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <ul className="absolute z-20 top-full mt-1.5 w-full backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 shadow-xl rounded-lg text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 overflow-hidden animate-fade-in">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                selected === option ? 'bg-purple-100 dark:bg-purple-900/30 font-medium' : ''
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
