import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState, useEffect } from "react";
import "./App.css";

/**
 * Main App component that manages the state of the task list, 
 * including persistence, filtering, and search functionality.
 */
function App(){
  // Initialize from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for filtering (all, active, completed) and search queries
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Adds a new task to the list with a unique ID and specified priority.
   * @param {string} text - The task description.
   * @param {string} priority - The priority level (Low, Medium, High).
   */
  function addTask(text, priority){
    setTasks([...tasks, {
      id: Date.now(), 
      text, 
      completed: false, 
      priority: priority || "Medium" 
    }]);
  }

  /**
   * Toggles the completion status of a specific task.
   * @param {number} id - The unique ID of the task to toggle.
   */
  function toggleTask(id){
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  }

  /**
   * Removes a task from the list by its ID.
   * @param {number} id - The unique ID of the task to delete.
   */
  function deleteTask(id){
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Derived Data
  // Filter and search logic combined to derive the visible task list
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === "all" ? true : 
      filter === "active" ? !task.completed : 
      task.completed;
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="app-container">
      <div className="task-card">
        <header>
          <h1>Productivity</h1>
          <div className="stats-container">
            <div className="stats-info">
              <span>{completedCount} of {tasks.length} tasks completed</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </header>

        <div className="controls">
          <input 
            type="text"
            placeholder="Search tasks..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-tabs">
            {["all", "active", "completed"].map(f => (
              <button 
                key={f}
                className={`filter-tab ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <TaskForm addTask={addTask} />

        <TaskList 
          tasks={filteredTasks} 
          toggleTask={toggleTask} 
          deleteTask={deleteTask} 
        />
      </div>
    </div>
  );
}

export default App;