import React, {useState} from "react";
import { Nav } from "react-bootstrap";

const server = "http://127.0.0.1:8080"

const styles = {
    form:{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        alignItems: 'left',
        marginBottom: '1rem'
    },
}

function SaveChanges(id){
    let title = document.getElementById("title").value;
    let description =  document.getElementById("description").value;

    fetch(server + "/api/save_changes",{
        method:"POST",
        body:JSON.stringify({"id":id, "title":title,"description":description}),
        headers:{"Content-Type":"application/json"}
    })
}

export default function TaskInfo({ task_info }){
    const [value, setValue] = useState(false)

    function TitleChanged(text){
        if(text.trim())
            setValue(false)
        else 
            setValue(true)
    }
    
    return(
        <form style={ styles.form }>
                <p>Заголовок</p> 
                <input defaultValue={ task_info[1] || '' } type="value" id="title" onChange={event => TitleChanged(event.target.value) }/> 
                <p>Описание</p> 
                <textarea defaultValue = { task_info[2] || '' } id="description" rows="4" cols="45"/> 
                <button type="button" disabled = { value } onClick={() => SaveChanges(task_info[0])}>Сохранить изменения</button>
                <Nav.Link href='/'>На главную</Nav.Link>
        </form>
    )
}