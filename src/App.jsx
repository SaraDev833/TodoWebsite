// 1. will add all todo in one state 2. show all todos 3.mark finished todos and assigned it in show finish tasks 4. update todo 5.delete todo
// we need two things:1.load todos when app starts 2. save todos whenever they change

import { useEffect, useState } from 'react'


function App() {

const [input, setInput] = useState("");
const [todos , setTodos] = useState(()=>{
  const saved = localStorage.getItem("todos");
  return saved?JSON.parse(saved):[];
})
const [showCompleted , setShowCompleted] = useState(false)
const [editId, setEditId] = useState(null);
const handleChange = (e)=>{
  setInput(e.target.value)
}
useEffect(()=>{
 localStorage.setItem("todos", JSON.stringify(todos))
},[todos])
 
const addTodos=()=>{
  if(!input.trim()) return;
 
   if(editId){
    const updatedTodo = todos.map(todo=>
      todo.id===editId?{...todo,text:input}:todo
    )
    setTodos(updatedTodo);
    setEditId(null)
   }
   else{

  const newTodo = {
    id: Date.now(),
    text:input,
    isCompleted: false
  }

  setTodos([...todos, newTodo]);
}
  setInput("")

}
const handleCheck = (id)=>{
   const updatedTodos = todos.map((todo)=>
        todo.id===id?{...todo,isCompleted:!todo.isCompleted} : todo
   )
   setTodos(updatedTodos);
}
const handleDelete = (id)=>{
  const updatedTodos = todos.filter((todo)=>
    todo.id !== id
  )
  setTodos(updatedTodos)
}
const handleEdit=(todo)=>{
    setInput(todo.text);
    setEditId(todo.id)


}
const filteredTasks = showCompleted?todos.filter(todo=>todo.isCompleted):todos;
  return (
<>
<div className="min-h-screen bg-linear-to-t from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center font-edu px-4">
  
  <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">

    {/* Title */}
    <h1 className="text-white text-3xl font-bold text-center mb-6 tracking-wide">
      Add My Todo
    </h1>

    {/* Input Section */}
    <div className="flex gap-3 items-center mb-4">
      <input
        type="text"
        
        placeholder="Add what you want to do today..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-slate-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange}
      />

      <button onClick={addTodos} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
        Save
      </button>
    </div>

    {/* Toggle */}
    <p className="text-slate-300 text-sm cursor-pointer hover:text-white transition mb-6" onClick={()=>setShowCompleted(!showCompleted)}>
      {showCompleted?"Show All Tasks" : "Show Finish Tasks"}
    </p>

    {/* Todo Item */}
   {filteredTasks.map((todo)=>(
    <div key={todo.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
  
      <div className="flex items-center gap-3">
        <input type="checkbox" className="h-5 w-5 accent-indigo-500 cursor-pointer" checked={todo.isCompleted} onChange={()=>handleCheck(todo.id)}/>
        <p className="text-white text-sm">
          {todo.text}
        </p>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition" onClick={()=>handleEdit(todo)}>
          Edit
        </button>
        <button className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white transition" onClick={()=>handleDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
))}

  </div>
</div>
</>
  )
}

export default App
