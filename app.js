// UI Variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event Listeners
loadEventListeners();

//function defination

function loadEventListeners() {
  //Dom Load Event 
  document.addEventListener("DOMContentLoaded",getTasks)
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from Local localStorage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    const li = document.createElement("li");

    //add class
    li.className = "collection-item";
  
    //create text node and append to LI
    li.appendChild(document.createTextNode(task));
  
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = " delete-item secondary-content";
    //add icon
    link.innerHTML = '<i class="fa fa-times"></i>';
  
    //append the link to li to
    li.appendChild(link);
  
    //append li to ul
    taskList.appendChild(li);
  
  })
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add task");
  }

  //create li element

  const li = document.createElement("li");

  //add class
  li.className = "collection-item";

  //create text node and append to LI
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = " delete-item secondary-content";
  //add icon
  link.innerHTML = '<i class="fa fa-times"></i>';

  //append the link to li to
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);


  //store in Local Storage 
  storeTask(taskInput.value)
  //clear input
  taskInput.value = "";

  e.preventDefault();
}

//function to remove task
function removeTask(e) {
  //console.log(e.target )

  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete this")) {
      e.target.parentElement.parentElement.remove();

      //remove task from localStorage
      removeTaskfromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

//remove from localStorage
function removeTaskfromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
      tasks.splice(index,1)
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

//function to store the tasks

function storeTask(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//function to clear tasks list

function clearTasks() {
  //taskList.innerHTML = '';        One way of clearing tasks

  //faster method

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear tasks from localStorage
   clearTaskStorage();
}

//clear tasks from localStorage
function clearTaskStorage(){
  localStorage.clear()
};

//function to filter Tasks 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display ='block';
    }
    else{
      task.style.display = 'none';
    }
  })

}
