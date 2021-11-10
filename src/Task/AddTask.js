import React, {useState} from "react";

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

function CreateTask(){
    let title = document.getElementById("title").value;
    let description =  document.getElementById("description").value;

    fetch(server + "/api/create_task",{
                            method:"POST",
                            body:JSON.stringify({"title":title,"description":description, "user_id": sessionStorage.getItem("user_id")}),
                            headers:{"Content-Type":"application/json"}
                        }).then(response => {if(response.status === 200) window.location.reload();});
}

function AddTask(){
    const [value, setValue] = useState(true)

    function TitleChanged(text){
        if(text.trim())
            setValue(false)
        else 
            setValue(true)
    }

    return(
        <form style={ styles.form }>
            <p>Заголовок</p> 
            <input type="value" id="title" onChange={event => TitleChanged(event.target.value) }/> 
            <p>Описание</p> 
            <textarea id="description" rows="4" cols="45"/> 
            <button type="button" disabled = { value } onClick={CreateTask}>Добавить задачу</button>
        </form>
    )
}

export default AddTask