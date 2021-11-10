import React from "react";
import Loader from "../Loader";
import TaskInfo from "../Task/TaskInfo";

const server = "http://127.0.0.1:8080"

let start = true

export default function TaskPage(props){
    let [task_info, setTaskInfo] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    if(start){
        fetch(server + "/api/task",{
            method:"POST",
            body:JSON.stringify({"id":props.match.params.id, "current_user":sessionStorage.getItem("user_id")}),
            headers:{"Content-Type":"application/json"}
        }).then(response =>{
            if(response.status === 200){
                response.json().then(data =>{
                    task_info.push(props.match.params.id)
                    task_info.push(data.title)
                    task_info.push(data.description)
                    setTaskInfo(task_info)
                    setLoading(false) 
                    start = false
                })
            }
            else if(response.status === 403 || response.status === 404){
                task_info.push(response.statusText)
                    task_info.push(response.statusText)
                    task_info.push(response.statusText)
                    setTaskInfo(task_info)
                    setLoading(false) 
                    start = false
            }
        });
    }

    return(
        <div className='wrapper'>
            <h1>ToDo app</h1>

            { loading && <Loader/> }

            {task_info ? <TaskInfo task_info = { task_info }/> : loading}
        </div>
    )
}