import TaskForm from "./components/TaskForm";

function App(){

 const [tasks,setTasks] = useState([]);

 function addTask(task){
  setTasks([...tasks, {id: Date.now(), text: task}]);
 }

 return (
  <div>
    <h1>CRUD App</h1>
    <TaskForm addTask={addTask}/>
  </div>
 );
}