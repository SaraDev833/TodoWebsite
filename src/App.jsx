import { useState } from 'react'


function App() {
 const [input, setInput] = useState("");
 const [todos, setTodos] = useState([]);
 const [showFinish , setShowFinish] = useState(false);


const filteredTasks = showFinish?todos.filter((todo)=>todo.isCompleted):todos;
const handleChange=(e)=>{
  setInput(e.target.value);
}
const handleSave=()=>{
  if(!input.trim()) return;

   const newTodo = {
    id:Date.now(),
    text:input,
    isCompleted:false
   }

   setTodos([...todos, newTodo]);
   setInput("");
}
const handleCheck=(id)=>{
 const checkedTodo = todos.map((todo)=>
     todo.id===id?{...todo, isCompleted:!todo.isCompleted} :todo

)
setTodos(checkedTodo)
}

 
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
        onChange={handleChange}
        placeholder="Add what you want to do today..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-slate-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
        Save
      </button>
    </div>

    {/* Toggle */}
    
    <p onClick={()=>setShowFinish(!showFinish)} className="text-slate-300 text-sm cursor-pointer hover:text-white transition mb-6">
      {showFinish?"show finished tasks" : "show all tasks"}
    </p>

    {/* Todo Item */}
   {filteredTasks.map((todo)=>(
    <div key={todo.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
         <div className="flex items-center gap-3" >
        <input type="checkbox" checked={todo.isCompleted} onChange={()=>handleCheck(todo.id)} className="h-5 w-5 accent-indigo-500 cursor-pointer" />
        <p className ={`text-sm text-white ${todo.isCompleted?"line-through  text-slate-900":""}`}>
         {todo.text}
        </p>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">
          Edit
        </button>
        <button className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white transition">
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
