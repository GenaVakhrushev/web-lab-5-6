import React from "react"
import TaskItem from "./TaskItem"

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        paddingLeft: 0,
        paddingTop: '1rem'
    }
}

export default function TaskList({task_list}){
    return(
        <ul style={styles.ul}> 
            {task_list          
            .map((task, index) => {
                return <TaskItem task={task} key={task.id} index={index}/>
            }) }
        </ul>
    )
}