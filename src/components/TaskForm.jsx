import { useState } from "react";

/**
 * Component for adding new tasks. Provides an input field for task text 
 * and a radio selector for priority levels.
 * @param {Object} props - Component props.
 * @param {Function} props.addTask - Function to add a new task to the main state.
 */
function TaskForm({addTask}){

  // Local state for the input field and selected priority
  const [input,setInput] = useState("");
  const [priority,setPriority] = useState("Medium");

 function handleSubmit(e){
  e.preventDefault();
  if(!input) return;

  addTask(input, priority);
  setInput("");
  setPriority("Medium");
 }

 return (
  <form onSubmit={handleSubmit} className="form-container">
    <div className="input-group">
      <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="Add a new task..."
        className="input-field"
      />
      <button className="btn btn-primary">Add Task</button>
    </div>
    
    <div className="priority-selector">
      {["Low", "Medium", "High"].map(p => (
        <label key={p} className={`priority-option ${priority === p ? "selected" : ""} ${p.toLowerCase()}`}>
          <input 
            type="radio" 
            name="priority" 
            value={p} 
            checked={priority === p} 
            onChange={(e) => setPriority(e.target.value)}
          />
          {p}
        </label>
      ))}
    </div>
  </form>
 );
}

export default TaskForm;