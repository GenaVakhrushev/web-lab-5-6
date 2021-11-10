import React from "react";
import TaskList from "../Task/TaskList";
import AddTask from "../Task/AddTask";
import Loader from '../Loader';
import AuthApi from "../AuthApi";
import Cookies from "js-cookie";

let start = true

const server = "http://127.0.0.1:8080"

const GetTasks = user_id =>{
  return new Promise((resolve,reject) => {
    fetch(server + "/api/tasks",{
      method:"POST",
      body:JSON.stringify({"user_id":user_id}),
      headers:{"Content-Type":"application/json"}
    }).then(response => response.json()).then(data =>{
      resolve(data.tasks);
    });
  })
}

function Logout(Auth){
  Auth.setAuth(false);
  Cookies.remove("user")
  sessionStorage.removeItem("user_id")
  start = true
}

function TasksPage() {
  const Auth = React.useContext(AuthApi)

  let [task_list, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  if(start){
    GetTasks(sessionStorage.getItem("user_id")).then((new_task_list) => {
      task_list = new_task_list;
      setTasks(task_list)
      setLoading(false)
      start = false
    })
  } 

  function Sort(){
    const sort_selct = document.getElementById("sort-select").value
    const new_task_list = task_list.concat()

    switch(sort_selct){
      case "not_completed":
        new_task_list.sort((a,b) => a.checked - b.checked)
        break;
      case "name":
        new_task_list.sort((a,b) => a.title.localeCompare(b.title))
        break;
      case "name_reverse":
        new_task_list.sort((a,b) => b.title.localeCompare(a.title))
        break;
      default:
        new_task_list.sort((a,b) => b.checked - a.checked)
        break;
    }
  
    setTasks(new_task_list)
  }

  return (
    <div className='wrapper'>
      <h1>ToDo app</h1>

      <AddTask/>

      {loading && <Loader/>}

      <select id="sort-select" onChange = {() => Sort()}>
        <option selected disabled hidden>Сортировка</option>
        <option value="completed">Сначала выполненные</option>
        <option value="not_completed">Сначала невыполненные</option>
        <option value="name">По имени</option>
        <option value="name_reverse">По имени наоборот</option>
      </select>

      {task_list.length ? <TaskList task_list={task_list}/> : loading ? null : <p>У вас нет задач</p>}

      <button onClick={() => Logout(Auth)}>Выйти</button>
    </div>
  );
}

export default TasksPage;
