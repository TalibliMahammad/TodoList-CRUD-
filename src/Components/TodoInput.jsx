import React, { useEffect, useMemo, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import Dropdown from './Dropdown';
import TodoList from './TodoList';
import { useDispatch, useSelector } from 'react-redux';

import Createtodo from './Createtodo';
import ExportImport from './ExportImport';
import Statistics from './Statistics';
import TaskTemplates from './TaskTemplates';
import { clearCompleted, toggleAll, toggleDarkMode, bulkDelete, bulkToggle } from './CounterSlice/CreateSlice';

const TodoInput = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState("All")
    const [sortBy, setSortBy] = React.useState("Newest")
    const [query, setQuery] = React.useState("")
    const [selectedIds, setSelectedIds] = useState(new Set())
    const [filterPriority, setFilterPriority] = React.useState("All")
    const [filterAssignee, setFilterAssignee] = React.useState("All")
    const [filterCategory, setFilterCategory] = React.useState("All")

    const isDarkMode = useSelector((state) => state.counter.darkMode)
    const items = useSelector(state => state.counter.items);

    const filterOptions = useMemo(() => ["All", "Complete", "Incomplete"], [])
    const sortOptions = useMemo(() => ["Newest", "Oldest", "Priority", "Deadline"], [])

    const normalizedQuery = query.trim().toLowerCase()

    const derived = useMemo(() => {
        let list = Array.isArray(items) ? [...items] : []

        // Filter archived
        list = list.filter((t) => !t.archived)

        // Search
        if (normalizedQuery) {
            list = list.filter((t) => 
                String(t.todoText ?? '').toLowerCase().includes(normalizedQuery) ||
                String(t.notes ?? '').toLowerCase().includes(normalizedQuery) ||
                (Array.isArray(t.tags) && t.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
            )
        }

        // Status filter
        if (selected === "Complete") list = list.filter((t) => t.isChecked)
        if (selected === "Incomplete") list = list.filter((t) => !t.isChecked)

        // Priority filter
        if (filterPriority !== "All") {
            list = list.filter((t) => t.priority === filterPriority)
        }

        // Assignee filter
        if (filterAssignee !== "All") {
            list = list.filter((t) => t.assignee === filterAssignee)
        }

        // Category filter
        if (filterCategory !== "All") {
            list = list.filter((t) => t.category === filterCategory)
        }

        // Sort
        const priorityRank = { High: 3, Medium: 2, Low: 1 }
        if (sortBy === "Newest") list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        if (sortBy === "Oldest") list.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
        if (sortBy === "Priority") list.sort((a, b) => (priorityRank[b.priority] ?? 0) - (priorityRank[a.priority] ?? 0))
        if (sortBy === "Deadline") list.sort((a, b) => String(a.deadline ?? '').localeCompare(String(b.deadline ?? '')))

        return list
    }, [items, normalizedQuery, selected, sortBy, filterPriority, filterAssignee, filterCategory])

    const uniqueAssignees = useMemo(() => {
        const assignees = new Set((items ?? []).map(t => t.assignee).filter(Boolean))
        return Array.from(assignees).sort()
    }, [items])

    const uniqueCategories = useMemo(() => {
        const categories = new Set((items ?? []).map(t => t.category).filter(Boolean))
        return Array.from(categories).sort()
    }, [items])

    const stats = useMemo(() => {
        const total = items?.length ?? 0
        const completed = (items ?? []).filter((t) => t.isChecked).length
        const active = total - completed
        const allCompleted = total > 0 && completed === total
        return { total, completed, active, allCompleted }
    }, [items])



    useEffect(() => {
        const body = document.body
        if (isDarkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Ctrl/Cmd + K: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                const searchInput = document.querySelector('input[placeholder="Search todo..."]')
                searchInput?.focus()
            }
            // Ctrl/Cmd + N: Create new todo
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault()
                const addButton = document.querySelector('.bg-gradient-to-r.from-purple-600')
                addButton?.click()
            }
            // Escape: Clear search
            if (e.key === 'Escape' && query) {
                setQuery('')
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [query])


    return (
        <div className='min-h-screen pb-20'>
            <div className='flex items-center justify-center pt-8 pb-6 animate-fade-in'>
                <h1 className='text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg'>
                    Todo List
                </h1>
            </div>

            <div className='flex justify-center px-4 pb-4 animate-fade-in'>
                <Statistics />
            </div>

            <div className='flex flex-col gap-4 items-center justify-center px-4 animate-fade-in'>
                <div className='w-full max-w-[900px] flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4'>
                    <div className='backdrop-blur-xl bg-white/20 dark:bg-black/20 shadow-2xl rounded-2xl p-2 flex items-center justify-between border border-white/30 dark:border-white/10 transition-all duration-300'>
                    <input 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} 
                        type="text" 
                        placeholder="Search todo... (Ctrl+K)" 
                        className={`${isDarkMode ? 'text-white placeholder:text-gray-300' : 'text-gray-800 placeholder:text-gray-500'} bg-transparent border-none p-3 rounded-xl w-[300px] md:w-[400px] lg:w-[505px] outline-none text-lg md:text-xl focus:ring-2 focus:ring-white/50`} 
                    />
                    <CiSearch className={`${isDarkMode ? 'text-white' : 'text-purple-700'} text-3xl md:text-4xl mr-2`} />
                    </div>

                    <div className='flex flex-wrap gap-3 justify-between md:justify-end'>
                        <div className='flex items-center justify-between rounded-xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
                            <Dropdown selected={selected} setSelected={setSelected} options={filterOptions} />
                        </div>
                        {uniqueAssignees.length > 0 && (
                            <div className='flex items-center justify-between rounded-xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
                                <Dropdown 
                                    selected={filterAssignee} 
                                    setSelected={setFilterAssignee} 
                                    options={["All", ...uniqueAssignees]} 
                                    widthClass="w-[150px]" 
                                />
                            </div>
                        )}
                        {uniqueCategories.length > 0 && (
                            <div className='flex items-center justify-between rounded-xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
                                <Dropdown 
                                    selected={filterCategory} 
                                    setSelected={setFilterCategory} 
                                    options={["All", ...uniqueCategories]} 
                                    widthClass="w-[150px]" 
                                />
                            </div>
                        )}
                        <div className='flex items-center justify-between rounded-xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
                            <Dropdown selected={sortBy} setSelected={setSortBy} options={sortOptions} widthClass="w-[180px]" />
                        </div>

                        <TaskTemplates />
                        <ExportImport />

                        <button
                            onClick={() => dispatch(clearCompleted())}
                            className="h-[56px] px-5 rounded-xl text-white font-semibold bg-white/15 hover:bg-white/25 border border-white/20 shadow-lg transition-all"
                            type="button"
                        >
                            Clear completed
                        </button>

                        <button
                            onClick={() => dispatch(toggleAll(!stats.allCompleted))}
                            className="h-[56px] px-5 rounded-xl text-white font-semibold bg-white/15 hover:bg-white/25 border border-white/20 shadow-lg transition-all"
                            type="button"
                        >
                            {stats.allCompleted ? 'Unmark all' : 'Mark all'}
                        </button>

                        <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'} flex items-center justify-center w-[56px] h-[56px] text-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12`}>
                            {
                                isDarkMode
                                    ? <FaMoon onClick={() => dispatch(toggleDarkMode())} className='text-2xl transition-transform duration-300 hover:rotate-180' />
                                    : <FaSun onClick={() => dispatch(toggleDarkMode())} className='text-2xl transition-transform duration-300 hover:rotate-180' />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <TodoList todos={derived} allCount={items?.length ?? 0} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />

            <Createtodo />
        </div>
    )
}

export default TodoInput