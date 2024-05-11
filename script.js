const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value;
  if (task == ""){
    alert( "Please enter a task")
    return;
  }
  const listItem = document.createElement("li");
  listItem.innerHTML = task;
  taskList.appendChild(listItem);
  let span = document.createElement("span");
  span.innerHTML = `&times`;
  listItem.appendChild(span);
  taskInput.value = "";
  saveListData();
});

taskList.addEventListener('click',(e)=>{
  if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked');
    saveListData();
  }
  if(e.target.tagName === 'SPAN'){
    e.target.parentElement.remove();
    saveListData();
  }
});

function showListData(){
  taskList.innerHTML = localStorage.getItem('taskListItems');
}

function saveListData() {
   localStorage.setItem("taskListItems", taskList.innerHTML);
}

showListData();
