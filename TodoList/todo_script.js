//selector
//const todoInput=document.getElementById(list1).nodeValue;
//const todoButton=document.getElementById(submitButton).nodeValue;
const todoInput=document.querySelector(".list1");
const todoButton=document.querySelector(".submitButton");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//event listener
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//functions
function addTodo(event)
{
event.preventDefault();
//todo div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//new list
const newTodo=document.createElement("li");
newTodo.innerText=todoInput.value;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);

//ADDD to local storage
saveLocalTodoss(todoInput.value);
//check mark button
const completedButton=document.createElement("button");
completedButton.innerHTML='<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//trash button

const trashButton=document.createElement("button");
trashButton.innerHTML='<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
todoList.appendChild(todoDiv);
todoInput.value="";
}

function deleteCheck(e)
{ 
const item=e.target;

//delete
if(item.classList[0]==="trash-btn")
{
 const todo =item.parentElement;
 todo.classList.add("fall");
 removeLocalTodos(todo);
 //animation
 todo.addEventListener("transitioned",function()
 {
    todo.remove();
 })
 
}
//check
if(item.classList[0]==="complete-btn")
{
    const todo=item.parentElement;
    todo.classList.toggle("completed");
}
}

//filter list
function filterTodo (e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo)
    {
    switch(e.target.value){
      case "all" :
          todo.style.display="flex";
          break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display="flex";
            } else{
                todo.style.display="none";
            }
            break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                } else{
                    todo.style.display="none";
                } 
                break;  
    }
    });
}
//save to local
function saveLocalTodoss(todo){
   
   // check if i have a thing in there
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
 todos.push(todo);
 localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
    // check if i have a thing in there
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos=[];
    } else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    todos.forEach(function(todo){   //todo div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//new list
const newTodo=document.createElement("li");
newTodo.innerText=todo;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);

//check mark button
const completedButton=document.createElement("button");
completedButton.innerHTML='<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//trash button

const trashButton=document.createElement("button");
trashButton.innerHTML='<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
todoList.appendChild(todoDiv);
        
    });

}
function removeLocalTodos(todo){
    // check if i have a thing in there
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos=[];
    } else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
const todoIndex= todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex),1);
console.log(todo.children[0].innerText);
localStorage.setItem("todos",JSON.stringify(todos));
}
