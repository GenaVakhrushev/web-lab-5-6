import React from "react";
import { Nav } from "react-bootstrap";

const server = "http://127.0.0.1:8080"

const styles = {
    li:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1 rem',
        border: '2px solid grey',
        borderRadius: '10px',
        marginBottom: '0.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function ToggleTask(id){
    fetch(server + "/api/checkbox_changed", {
      method:"POST",
      body:JSON.stringify({"id":id}),
      headers:{"Content-Type":"application/json"}
  })
}

function DeleteTask(id, event){
    let task_element = event.target.parentElement;

    fetch(server + "/api/delete_task", {
                            method:"POST",
                            body:JSON.stringify({"id":id}),
                            headers:{"Content-Type":"application/json"}
                        }).then(response => {if(response.status === 200) task_element.remove();});
}

export default function TaskItem({ task, index }){
    const ref = "/task/" + task.id

    return(
        <li style={ styles.li }>
            <span>                
            <input style={ styles.input } type="checkbox" onChange={() => ToggleTask(task.id)} defaultChecked={!!task.checked}/>
                <strong>{ index + 1}</strong>
                &nbsp;
                <Nav.Link href={ref}> {task.title} </Nav.Link>
            </span>
            
            <button className="remove-button" onClick={event => DeleteTask(task.id, event)}>&times;</button>
        </li>
    )
}