
import React from 'react';



// function TaskList({ tasks }) {
function TaskList({tasks}) {





  return (


    <div>
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>

          <img src={task.sprites?.front_default} alt={task.name} />
          <p><b>Nome:</b> {task.name}</p>
          <p><b>Experiência base:</b>{task.base_experience}</p>


          <ul><p><b>Tipo</b></p>
            {task.types.map(type => (
              <span key={type.type.name}><p>{type.type.name}</p> </span>
            ))}
          </ul>

          
        </li>
      ))}

    </ul>



    </div>

    
  );
 }

export default TaskList;