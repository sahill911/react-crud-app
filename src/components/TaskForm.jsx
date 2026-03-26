import { useState } from "react";

function TaskForm({addTask}){

 const [input,setInput] = useState("");

 function handleSubmit(e){
  e.preventDefault();
  if(!input) return;

  addTask(input);
  setInput("");
 }

 return (
  <form onSubmit={handleSubmit}>
    <input
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      placeholder="Enter task"
    />

    <button>Add</button>
  </form>
 );
}

export default TaskForm;