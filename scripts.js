// taking the input value - enter a new task in input box
const input = document.getElementById('input-text');
const todoList = document.getElementById('tasks');
// clicking the add button for adding a new task
const submitButton = document.getElementById('submit-task');
 
 
submitButton.addEventListener('click', function(e){
    const inputText = input.value;
 
    if(inputText == ''){
        alert('Please enter a task');
    }
    else{
        addTask(inputText);
    }
   
    // clear the input field after adding task
    input.value = '';    
});
 
 
input.addEventListener('keypress', function(e){
    if(e.key == "Enter"){
        const inputText = input.value;
 
        if(inputText == ''){
            alert('Please enter a task');
        }
        else{
            addTask(inputText);
        }
       
        // clear the input field after adding task
        input.value = '';    
    }
});
 

 
 
 
 
//  function to add a task along with checkbox, delete button, edit button
function addTask(task, status){
    const listItem = document.createElement('li')
    // console.log(status)
 
 
    // checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'checking');
    checkbox.checked = status;
    listItem.appendChild(checkbox);
  
    
    // editable task field
    let taskText = document.createElement('input');
    taskText.setAttribute('class', 'input-field')
    // taskText.setAttribute('contenteditable', 'true');
    taskText.disabled = true  
    taskText.value = task;


    if(status){
        taskText.style.textDecoration = 'line-through'
    }
    listItem.appendChild(taskText);
 
 
 
    // const deleteeButon = document.createElement('button');
    // deleteeButon.textContent = 'DELETE';
 
 
 
    // edit button
    const editButton = document.createElement('button');
    editButton.textContent = "EDIT";
 
 
 
              // editButton event
 
              editButton.addEventListener("click", function(e){
                if(editButton.textContent === "EDIT"){
                    taskText.disabled = false
               
                    editButton.textContent = "SAVE"
                }
                else{
                    taskText.disabled = true
               
                    editButton.textContent = "EDIT"
 
                }
                saveTasksToLocalStorage()
            })
 
 
 
    listItem.appendChild(editButton);
 
 
 
 
 
 
    // delete button
    const deleteButton = document.createElement('i');
    deleteButton.setAttribute('class', 'fa-solid fa-xmark')
 
    listItem.appendChild(deleteButton);
 

    todoList.appendChild(listItem);


 
 
 
   
 
        // checkbox event
        checkbox.addEventListener('change', function(e){
      
            console.log(checkbox.value)
            if(checkbox.checked){
                
                taskText.style.textDecoration = 'line-through';
                saveTasksToLocalStorage()
            }
            else{
                taskText.style.textDecoration = 'none';
                saveTasksToLocalStorage()
            }
            
           
        });
     
 
 
   
   
        // deleteButton event
        deleteButton.addEventListener('click', function(e){
            todoList.removeChild(listItem);
            saveTasksToLocalStorage()
        });   



 
         saveTasksToLocalStorage();    
 
}
 
// addtask function ends here
 





 
    // clearButton event - clear all tasks
    const clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener('click', function(e){
        if (confirm('Clear all tasks?')){
            const deletedLi = document.querySelectorAll('li');
            // console.log(deletedLi)
   
            deletedLi.forEach(e => e.remove());
        }  
        saveTasksToLocalStorage()
       
 
    });






 
    // local storage implementation:
    // to save tasks and status of checkbox
 
    const activeTask = document.querySelector(".activeBtn");
    const completeTask = document.querySelector(".completeBtn");


    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#tasks li').forEach(task => {
            const taskText = task.querySelector('.input-field').value;
            const completed = task.querySelector('.checking').checked
            const individualTask = {
                text: taskText, 
                isCompleted: completed
            }
    
            tasks.push(individualTask);


            
       
 
        });
 
 
        localStorage.setItem('tasks', JSON.stringify(tasks))

      }
 
     
 
      
    // get all tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text, task.isCompleted);
    });
 
 
    console.log(savedTasks)

    
 
    activeTask.addEventListener("click", function(e){
        console.log((tasks));
    })


 
    activeTask.addEventListener("click", function(e, status){
        tasks.forEach((item) => {
            if(status == true){
                item.style.display = "none"
            }
            else{
                item.style.display = "flex"
            }
        }) 
        saveTasksToLocalStorage()
    });



    completeTask.addEventListener("click", function(e, status){
        tasks.forEach((item) => {
            if(status == true){
                item.style.display = "flex"
            }
            else{
                item.style.display = "none"
            }
        }) 
        saveTasksToLocalStorage()
    });






    // activeTask.addEventListener("click", function(e, status){
    //     savedTasks.forEach((item) => {
    //         if(status == true){
    //             item.value = true;
    //         }
    //     }) 
    //     saveTasksToLocalStorage()
    // });



    // completeTask.addEventListener("click", function(e, status){
    //     savedTasks.forEach((item) => {
    //         if(status == false){
    //             item.value = false;
    //         }
    //     }) 
    //     saveTasksToLocalStorage()
    // });





     // filter tasks :

        // task filtering based on completed/active:
        // .filter method ne pan karu shakto
        // or je checked the display none je unchecked te display block and vice versa ..onclick varti 
    
        //    approach 1: onclikk handler vaala
    










 
 
 
 
