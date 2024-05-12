if('serviceWorker' in navigator)
{
  navigator.serviceWorker
    .register('service-worker.js')
    .then(()=> console.log('Service Worker Registered'))
}
const downloadbtn = document.getElementById('downloadbtn');

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
let deferredPrompt;
downloadbtn.style.display= "none";
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredPrompt = e;
  downloadbtn.style.display= "block";
  downloadbtn .addEventListener("click",()=>{
    downloadbtn.style.display= "none";
    deferredPrompt.prompt()
    defferredPrompt.userChoice.then((choiceResult)=>{
      if(choiceResult.outcome == "accepted"){
        console.log("App is installing");
      }else{
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    })
  })
})
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
