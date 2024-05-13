// taking the input value - enter a new task in input box
const input = document.getElementById('input-text');
const categoryInput = document.getElementById('input-category');
const todoList = document.getElementById('tasks');
// clicking the add button for adding a new task
const submitButton = document.getElementById('submit-task');



submitButton.addEventListener('click', function(e){
    const inputText = input.value;
    const inputCategory = categoryInput.value;
 
    if(inputText == ''){
        alert('Please enter a task');
    }
    else if(inputCategory == ''){
        alert('Please enter a category');
    }
    else if(inputText.length < 3){
        alert('Enter a valid task')
    }
    else if(inputCategory.length < 3){
        alert('Enter a valid category')
    }
    else{
        addTask(inputText, inputCategory);
    }
    // clear the input field after adding task
    input.value = '';    
    categoryInput.value = '';
});




const initiate =  function(e){
    if(e.key == "Enter"){
        const inputText = input.value;
        const inputCategory = categoryInput.value;
 
        if(inputText == ''){
            alert('Please enter a task');
        }
        else if(inputCategory == ''){
            alert('Please enter a category');
        }
        else if(inputText.length < 3){
            alert('Enter a valid task')
        }
        else if(inputCategory.length < 3){
            alert('Enter a valid category')
        }
        else{
            addTask(inputText);
        }
       
        // clear the input field after adding task
        input.value = '';    
        categoryInput.value = '';
    }
}
 


// submitButton.addEventListener('click', initiate);
input.addEventListener('keypress', initiate);



 
 
 
//  ----------------------------------addtask function---------------------------

//  function to add a task along with checkbox, delete button, edit button
function addTask(task, taskCategory='', status=false){
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
    listItem.appendChild(taskText);

    if(status){
        taskText.style.textDecoration = 'line-through'
    }



    // editable category:
    let label = document.createElement('input')
    label.setAttribute('class', 'label')
    

    label.disabled = true;
    label.value = taskCategory;
    label.setAttribute('id', `${taskCategory}`)


    listItem.appendChild(label);


 
 
    // const deleteeButon = document.createElement('button');
    // deleteeButon.textContent = 'DELETE';
 
 
 
    // edit button
    // const editButton = document.createElement('button');
    // editButton.textContent = "Edit";

    const editButton = document.createElement('i');
    editButton.setAttribute('class', 'fa-solid fa-pen-to-square')
    editButton.style.cursor = 'pointer'
 
 
 
              // editButton event
 
              editButton.addEventListener("click", function(e){
                if(editButton.classList.contains("fa-pen-to-square")){
                    taskText.disabled = false;
                    label.disabled = false;
               
                    // editButton.textContent = "Save"
                    editButton.classList.replace('fa-pen-to-square', 'fa-check');
                    
                }
                else
                {
                    taskText.disabled = true;
                    label.disabled = true;

                    // editButton.textContent = "Edit"
                    editButton.classList.replace('fa-check', 'fa-pen-to-square')
 

                }
                saveTasksToLocalStorage()
            })
 

    listItem.appendChild(editButton);

 
    // delete button
    const deleteButton = document.createElement('i');
    deleteButton.setAttribute('class', 'fa-solid fa-trash')
    deleteButton.style.cursor = 'pointer'


 
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
   
 
        // checkbox event
        checkbox.addEventListener('change', function(e){
      
            // console.log(checkbox.value)
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
 
// ----------------addtask function ends here----------------



 
    // -----------------local storage implementation----------------------
    // to save tasks and status of checkbox



    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#tasks li').forEach(task => {
            const taskText = task.querySelector('.input-field').value;
            const completed = task.querySelector('.checking').checked;
            const taskCategory = task.querySelector('.label').value;
            const individualTask = {
                text: taskText, 
                isCompleted: completed,
                category: taskCategory,
            }
    
            tasks.push(individualTask);     
        });

        localStorage.setItem('tasks', JSON.stringify(tasks))    
      }

      
    // get all tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text,  task.category, task.isCompleted);
    });
 


    // ---------------------PAGINATION-------------------------


    // for pagination
    const allTasks =  Array.from(document.querySelectorAll('li'))
    const tasksPerPage = 5;    
    let currentPage = 1;         
    let totalPages = Math.ceil(savedTasks.length/tasksPerPage)
    // update page
    const pageNumbers = document.getElementById('page-numbers')
    const prevButton = document.getElementById('previous')
    const nextButton = document.getElementById('next')
    // const pageLinks = document.querySelectorAll('.page-link')
    const pagination = document.getElementById('pagination')


    // dynamically create new pages as tasks increase
    for(let i=1; i<=totalPages; i++){
        // console.log(i);
        // <a href="#" class="page-link" data-page="3">3</a>
        const links = document.createElement('a');
        links.setAttribute('href', '#')
        links.setAttribute('class', 'page-link');
        links.setAttribute('data-page', `${i}`)
        links.textContent = `${i}`;

        // pagination.appendChild(links)
        nextButton.insertAdjacentElement('beforebegin',links)
        
    }

    const pageLinks = document.querySelectorAll('.page-link')
    // console.log(pageLinks)        


    // function to display tasks for a specific page 
    function displayPage(page){
        const startIndex = (page - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;

        allTasks.forEach((task, index) => {
            if(index >= startIndex && index < endIndex){
                task.style.display = 'flex';
            }
            else{
                task.style.display = 'none';
            }
        });
    }



    // // function to update pagination buttons

    function updatePagination(){
        pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        pageLinks.forEach((link) => {
            const page = parseInt(link.getAttribute('data-page'));
            link.classList.toggle('active', page === currentPage);
        })
    }


    // Event listners for buttons and page numbers : 

    // Event listner for previous button :
    prevButton.addEventListener("click", () => {
        if(currentPage > 1){
            currentPage--;
            displayPage(currentPage);
            updatePagination();
        }
        console.log('prevbutton clicked')
    })

    // Event listner for next button :
    nextButton.addEventListener("click", () => {
        if(currentPage < totalPages){
            currentPage++;
            displayPage(currentPage);
            updatePagination();
        }
        console.log('nextbutton clicked')
    })


    // event listners for page number buttons:
    pageLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(link.getAttribute('data-page'));
            if(page !== currentPage){
                currentPage = page;
                displayPage(currentPage);
                updatePagination();
            }
        })
    })


    displayPage(currentPage); 
    updatePagination();





     



    // ------------------------clear button, active , complete and all tasks event---------------------------


 
    // clearButton event - clear all tasks
    const clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener('click', function(e){
        if (confirm('Clear all tasks?')){
            const deletedLi = document.querySelectorAll('li');   
            deletedLi.forEach(e => e.remove());
        }  
        saveTasksToLocalStorage()
       
    });


    // ----------------------dropdown based filtering:---------------------------

    // event listner for all, active complete task filters:

    const toselectli = document.querySelectorAll('li')
    const select = document.querySelector('#filters')
    // console.log(select.childNodes)

    select.addEventListener('change', (e) => {
        if(select.value == 'All Tasks'){
                toselectli.forEach(function(e){
                    e.style.display = 'flex'
                })
        }
        
        if(select.value == 'Active Tasks'){
            toselectli.forEach(function(e){
                if(e.firstChild.checked == true){
                    e.style.display = 'none'
                }
                else{
                    e.style.display = 'flex'
                }
        })
        }

        if(select.value == 'Complete Tasks'){
            // displayPage(currentPage); 
            updatePagination();
            toselectli.forEach(function(e){
                if(e.firstChild.checked == true){
                    e.style.display = 'flex'
                }
                else{
                    e.style.display = 'none'
                }
                displayPage(currentPage); 
        })
        }
        // displayPage(currentPage); 
    })




    // Event listner for category based filtering:

    const selectCt = document.querySelector('#category')
    selectCt.addEventListener('change', (e) => {

        // toselectli.forEach(function(e){
        //     if(e.childNodes[2].id == selectCt.value){
        //         e.style.display = 'flex';
        //     }
        //     else{
        //         e.style.display = 'none';
        //     }
        // })

        if(selectCt.value == 'Work'){
            toselectli.forEach(function(e){
                if(e.childNodes[2].id == 'Work'){
                    e.style.display = 'flex'
                }
                else{
                    e.style.display = 'none'
                }
        })
        }


        if(selectCt.value == 'Household'){
            toselectli.forEach(function(e){
                if(e.childNodes[2].id == 'Household'){
                    e.style.display = 'flex'
                }
                else{
                    e.style.display = 'none'
                }
        })
        }

        if(selectCt.value == 'Shopping'){
            toselectli.forEach(function(e){
                if(e.childNodes[2].id == 'Shopping'){
                    e.style.display = 'flex'
                }
                else{
                    e.style.display = 'none'
                }
        })
        }

        if(selectCt.value == 'Others'){
            toselectli.forEach(function(e){
                if(e.childNodes[2].id == 'Shopping' || e.childNodes[2].id == 'Work' || e.childNodes[2].id == 'Household'){
                    e.style.display = 'none'
                }
                else{
                    e.style.display = 'flex'
                }
        })
        }

        

    })








    






        
    










 
 
 
 
