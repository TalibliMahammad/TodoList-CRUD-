import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import Dropdown from './Dropdown';
import TodoList from './TodoList';
import { useDispatch, useSelector } from 'react-redux';

import Createtodo from './Createtodo';
import { toggleDarkMode } from './CounterSlice/CreateSlice';

const TodoInput = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);
    const [selected, setSelected] = React.useState("All")
    const isDarkMode = useSelector((state) => state.counter.darkMode)
    const{ value} = useSelector(state => state.counter);

    const filteredTodos = value.filter((todo) => {
        if (selected == "All") {
            return true;
        }
        if (selected == "Complete") {
            return todo.isChecked;
        }
        if (selected =="Incomplete") {
            return !todo.isChecked;
        }else{
            console.log("burdayam");
            return true;
            
        }

    })
   
    

    useEffect(() => {
        const body = document.body
        if (isDarkMode) {
            body.style.backgroundColor = 'black';
            body.classList.add('dark');
        } else {
            body.style.backgroundColor = 'white';
            body.classList.remove('dark');
        }
    }, [isDarkMode]);


    return (
        <div className=' '>
            <div className=' flex  justify-center  gap-5  '>

                <div className=' shadow w-[30%] mt-10 text-white p-1 rounded-lg flex items-center justify-between border border-violet-600  '>
                    <input type="text" placeholder="Search todo" className="border p-2 rounded w-full outline-none  border-none text-2xl text-violet-900" />
                    <CiSearch className=' text-violet-800  text-[35px]' />
                </div>

                <div className='flex gap-5  justify-between items-end '>

                    <div className='  flex items-center   p-5 justify-between h-[50px] text-white  rounded-lg  cursor-pointer'>
                        <Dropdown selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='  bg-violet-700 flex items-center justify-center w-[50px] h-[50px] text-white   rounded-lg border border-violet-600 cursor-pointer'>
                        {
                            isDarkMode
                                ? <FaMoon onClick={() => dispatch(toggleDarkMode())} className='text-[20px] transition-transform duration-300 rotate-0 hover:rotate-180' />
                                : <FaSun onClick={() => dispatch(toggleDarkMode())} className='text-[20px] transition-transform duration-300 rotate-0 hover:rotate-180' />
                        }

                    </div>
                </div>
            </div>
            <TodoList todos={filteredTodos} />


            <Createtodo />

        </div>
    )
}

export default TodoInput