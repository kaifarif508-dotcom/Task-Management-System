import React from 'react'
import Toda from './components/Todo'
import { useTheme } from './context/Context'
import { Toaster } from "react-hot-toast";

const App = () => {
  const { dark, setDark } = useTheme()

  return (
    <div className={`min-h-screen w-full 
      ${dark ? "bg-[#11151C] text-white" : "bg-[#E9E9E9] text-black"} 
      flex flex-col items-center px-4 sm:px-6 md:px-10`}>

      {/* HEADER */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row 
        items-center justify-between gap-4 py-6">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
          Todo List
        </h1>

        <button
          onClick={() => setDark(prev => !prev)}
          className="px-4 py-2 bg-[#590C6A] rounded-md text-white cursor-pointer"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

      </div>

      {/* TODO COMPONENT */}
      <div className="w-full max-w-4xl">
        <Toda />
      </div>

    </div>
  )
}

export default App