import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/Context'
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Task = () => {
  const [title, setTitle] = useState("")
  const [task, setTask] = useState("")
  const [edit, setEdit] = useState(null)
  

  const [todo, setTodo] = useState(() => {
    let saved = localStorage.getItem("todo")
    return saved ? JSON.parse(saved) : []
  })

  const { dark } = useTheme()

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo))
  }, [todo])

  // Submit Handler
  function submitHandler(e) {
    e.preventDefault()

    if (!title.trim() || !task.trim()) {
       toast.error("Please fill both fields")
      return
    }

    if (edit !== null) {
      const updatedTodo = todo.map((item, i) =>
        i === edit ? {...item, title, task } : item
    )
    setTodo(updatedTodo)
    setEdit(null)
    toast.success("Task updated")
    } else {
      setTodo([...todo, { title, task ,complete:false}])
       toast.success("Task added")
    }

    setTitle("")
    setTask("")
  }

  

  // Delete Handler
  function DeleteHandler(idx) {
    const newTodo = todo.filter((_, i) => i !== idx)
    setTodo(newTodo)
     toast.success("Task deleted")
  }

  //complete task

  function toggleTheme(index){
  let UPdate =  todo.map((item,i)=>{
    if(i === index){
      let newStatus = !item.complete 
      if(newStatus){

        toast.success("Task completed ✅")
      }
      else{

        toast("Marked as pending 🔄")
      }
return{...item , complete: !item.complete}
    }
  
      return item


    })
    setTodo(UPdate)
  }
  
  return (
    <>
     <Toaster position="top-center" />
    <div className={`min-h-screen flex justify-center items-start py-10 px-4 
      ${dark ? "bg-[#2c2c2c]" : "bg-gray-100"}`}>

      <div className={`w-full max-w-3xl rounded-2xl shadow-xl p-6 
        ${dark ? "bg-[#444]" : "bg-white"}`}>

        {/* FORM */}
        <form 
          onSubmit={submitHandler}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
            className="flex-1 px-4 py-2 border rounded-md outline-none"
          />

          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Task..."
            className="flex-1 px-4 py-2 border rounded-md outline-none"
          />

          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            {edit !== null ? "Update" : "Add"}
          </button>
        </form>

        {/* TODO LIST */}
        <div className="mt-8 flex flex-col gap-4">
          {todo.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-xl border 
                ${dark ? "bg-[#666] text-white" : "bg-gray-100"}`}
            >
              {/* TEXT */}
              <div className='flex  items-center gap-4'>
              <div className='text-2xl'>
                <input type="checkbox"
                checked={item.complete}
                onChange={()=>(
                  toggleTheme(i)
          )} />
              </div>
              <div>

                <h5 className={`font-bold ${item.complete ? "line-through" : ""}`}>Title: {item.title}</h5>
                <p className={` ${item.complete ? "line-through" : ""}`}>Task: {item.task}</p>
              </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEdit(i)
                    setTitle(item.title)
                    setTask(item.task)
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => DeleteHandler(i)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </>
  )
}

export default TaskSignal