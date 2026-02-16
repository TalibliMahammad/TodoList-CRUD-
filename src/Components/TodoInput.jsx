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
        <div className='min-h-screen pb-24 px-4'>
            <header className='max-w-3xl mx-auto pt-8 pb-6 animate-fade-in'>
                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent'>
                    Todo List
                </h1>
            </header>

            <div className='max-w-3xl mx-auto animate-fade-in'>
                <Statistics />
            </div>

            <section className='max-w-3xl mx-auto mt-6 space-y-4 animate-fade-in'>
                {/* Search */}
                <div className='flex items-center gap-2 p-2 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 backdrop-blur-sm'>
                    <CiSearch className={`${isDarkMode ? 'text-white/70' : 'text-purple-600/80'} text-xl shrink-0 ml-2`} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Axtarış... (Ctrl+K)"
                        className={`flex-1 min-w-0 py-2.5 bg-transparent border-none outline-none text-base ${isDarkMode ? 'text-white placeholder:text-white/50' : 'text-gray-800 placeholder:text-gray-500'}`}
                    />
                </div>

                {/* Filters row */}
                <div className='flex flex-wrap items-center gap-2'>
                    <Dropdown selected={selected} setSelected={setSelected} options={filterOptions} widthClass="w-[130px]" />
                    <Dropdown selected={sortBy} setSelected={setSortBy} options={sortOptions} widthClass="w-[130px]" />
                    {uniqueAssignees.length > 0 && (
                        <Dropdown selected={filterAssignee} setSelected={setFilterAssignee} options={["All", ...uniqueAssignees]} widthClass="w-[120px]" />
                    )}
                    {uniqueCategories.length > 0 && (
                        <Dropdown selected={filterCategory} setSelected={setFilterCategory} options={["All", ...uniqueCategories]} widthClass="w-[120px]" />
                    )}
                    <div className='flex-1 min-w-[80px]' />
                    <div className='flex items-center gap-2'>
                        <TaskTemplates />
                        <ExportImport />
                        <button
                            onClick={() => dispatch(clearCompleted())}
                            className="h-10 px-4 rounded-lg text-sm font-medium text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                            type="button"
                        >
                            Təmizlə
                        </button>
                        <button
                            onClick={() => dispatch(toggleAll(!stats.allCompleted))}
                            className="h-10 px-4 rounded-lg text-sm font-medium text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                            type="button"
                        >
                            {stats.allCompleted ? 'Ləğv et' : 'Hamısı'}
                        </button>
                        <button
                            onClick={() => dispatch(toggleDarkMode())}
                            className={`h-10 w-10 flex items-center justify-center rounded-lg border border-white/20 transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-purple-600/80 hover:bg-purple-600'}`}
                            type="button"
                        >
                            {isDarkMode ? <FaMoon className='text-lg text-white' /> : <FaSun className='text-lg text-white' />}
                        </button>
                    </div>
                </div>
            </section>

            <TodoList todos={derived} allCount={items?.length ?? 0} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />

            <Createtodo />
        </div>
    )
}

export default TodoInput