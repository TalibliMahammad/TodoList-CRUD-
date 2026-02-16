import React from 'react'

const Checkbox = ({ checked, onChange }) => {
    return (
        <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
                <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={onChange} 
                    className="peer h-6 w-6 cursor-pointer transition-all duration-300 appearance-none rounded-lg shadow-md hover:shadow-lg border-2 border-gray-300 dark:border-gray-600 checked:bg-gradient-to-r checked:from-purple-600 checked:to-pink-600 checked:border-transparent hover:scale-110" 
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                </span>
            </label>
        </div>
    )
}

export default Checkbox