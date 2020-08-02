
//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list')

//event listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// functions

function addTodo(event)
{
    event.preventDefault();
    //Todo DIV
    const TodoDIV = document.createElement('div');
    TodoDIV.classList.add('todo');

    //Create LI
    const newToDo = document.createElement('li')
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    TodoDIV.appendChild(newToDo);

    // ADD todo to
    savelocalTodos(todoInput.value)

    // Create buttons
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button')
    TodoDIV.appendChild(completedButton)

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('trash-btn')
    TodoDIV.appendChild(deleteButton);

    todoList.appendChild(TodoDIV); 

    //cleat todo inout vale
    todoInput.value ="";
}



function deleteCheck(event)
{   
    const item = event.target
    console.log(item)
    //delete the todo
   if(item.classList[0]==='trash-btn')
   {
       const todo = item.parentElement;
       todo.classList.add("fall");
       removeTodo(todo);
       todo.addEventListener('transitionend', function(){
           todo.remove();
       })
   }
   // Complete the todo as marked
   if(item.classList[0] === 'complete-button')
   {
       const todo = item.parentElement;
       todo.classList.toggle('completed');
   }
}


function savelocalTodos(todo)
{
    //--check
    let todos;
    if(localStorage.getItem('todos')===null)
    {


        todos =[];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'))

    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos()
{
    console.log("Hello!")
  
    if(localStorage.getItem('todos')===null)
    {
        todos =[];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const TodoDIV = document.createElement('div');
        TodoDIV.classList.add('todo');
    
        //Create LI
        const newToDo = document.createElement('li')
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        TodoDIV.appendChild(newToDo);
        // Create buttons
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-button')
        TodoDIV.appendChild(completedButton)
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('trash-btn')
        TodoDIV.appendChild(deleteButton);
        todoList.appendChild(TodoDIV); 
    });
}

function removeTodo(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos =[];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
   const todoIndex = todo.children[0].innerText;
 todos.splice(todos.indexOf(todoIndex),1);
 localStorage.setItem('todos', JSON.stringify(todos))
}