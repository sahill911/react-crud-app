/**
 * Renders a list of task items. Shows an empty state message if no tasks are present.
 * @param {Object} props - Component props.
 * @param {Array} props.tasks - The filtered list of tasks to display.
 * @param {Function} props.toggleTask - Function to toggle task completion.
 * @param {Function} props.deleteTask - Function to delete a task.
 */
function TaskList({ tasks, toggleTask, deleteTask }){
 if (tasks.length === 0) {
  return (
   <div className="empty-state">
     <div className="empty-icon">✨</div>
     <p>All caught up! Time to relax or add a new goal.</p>
   </div>
  );
 }

 return (
  <div className="task-list">
    {tasks.map(task => (
      <div key={task.id} className={`task-item ${task.priority.toLowerCase()}-priority`}>
        <div className="task-content">
          <span className={`priority-badge`}>{task.priority}</span>
          <span className={`task-text ${task.completed ? "completed" : ""}`}>
            {task.text}
          </span>
        </div>
        <div className="task-actions">
          <button 
            onClick={() => toggleTask(task.id)}
            className="btn btn-secondary"
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
 );
}

export default TaskList;