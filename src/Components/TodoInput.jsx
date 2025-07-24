import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import Dropdown from './Dropdown';
import TodoList from './TodoList';
import { useDispatch } from 'react-redux';

import Createtodo from './Createtodo';

const TodoInput = () => {
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState("All")


 useEffect(() => {
  if (darkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, [darkMode]);



    return (
        <div className=''>
            <div className=' flex  justify-center  gap-5  '>

                <div className=' shadow w-[30%] mt-10 text-white p-1 rounded-lg flex items-center justify-between border border-violet-600  '>
                    <input type="text" placeholder="Search todo" className="border p-2 rounded w-full outline-none  border-none text-2xl text-violet-900" />
                    <CiSearch className=' text-violet-800  text-[35px]' />
                </div>

                <div className='flex gap-5  justify-between items-end '>

                    <div className='  flex items-center   p-5 justify-between h-[50px] text-white  rounded-lg border cursor-pointer'>
                        <Dropdown selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='  bg-violet-700 flex items-center justify-center w-[50px] h-[50px] text-white   rounded-lg border border-violet-600 cursor-pointer'>
                        {
                            darkMode ? <FaMoon onClick={() => setDarkMode(!darkMode)} className='text-[20px] transition-transform duration-300 rotate-0 hover:rotate-180  ' /> : <FaSun className='text-[20px] transition-transform duration-300 rotate-0 hover:rotate-180 ' onClick={() => setDarkMode(!darkMode)} />
                        }

                    </div>
                </div>
            </div>
            <TodoList />


           <Createtodo />

        </div>
    )
}

export default TodoInput