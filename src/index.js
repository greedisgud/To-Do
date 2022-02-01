const projectsContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectButton = document.querySelector('[data-delete-project]');
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitle = document.querySelector('[data-list-title]');
const listCount = document.querySelector('data-list-count');
const tasksContainer = document.querySelector('[data-tasks]')


//Storage Keys
const LOCAL_STORAGE_PROJECT_KEY = 'project.lists';
const LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'project.selectedId'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);



projectsContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li'){
        selectedProjectId = e.target.dataset.projectId
        save()
        render()
        
    }
})



//Create a new project
newProjectForm.addEventListener('submit', e => {
    e.preventDefault();
    const projectName = newProjectInput.value;
    if (projectName === null || projectName === "") return alert("ERROR"); 
    const project = createProject(projectName)
    newProjectInput.value = null;
    projects.push(project);
    render();
    save();
})

//delete a project from a list
deleteProjectButton.addEventListener('click', (e) => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    save();
    render();
})

//Returns Object -> Gives Projects a unique ID
function createProject(name){
    return {id: Date.now().toString(), name: name, tasks: [] }
}

//save to local storage
function save(){
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, selectedProjectId);
}

function render(){
    clearElement(projectsContainer)
    renderProjects()
    const selectedProject = projects.find(project => project.id === selectedProjectId);

    if (selectedProjectId === null){
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = ''
        listTitle.innerText = selectedProject.name
        renderTaskCount(selectedProject)
    }
}

function renderTaskCount(selectedProject){
    const incompleteTasksCount = selectedProject.tasks.filter(task => !task.complete).length
    const taskString = incompleteTasksCount === 1 ? 'task':'tasks';
    listCount.innerText = `${incompleteTasksCount} ${taskString} remaining`
}



//Add projects to side bar
function renderProjects(){
    clearElement(projectsContainer);
    projects.forEach(project => {
        const projectElement = document.createElement('li');
        projectElement.dataset.projectId = project.id;
        projectElement.classList.add('project-name');
        projectElement.innerText = project.name;
        if(project.id === selectedProjectId) {
            projectElement.classList.add('active-project')
        }
        projectsContainer.appendChild(projectElement)
    })
}

//clears bar after submit
function clearElement(element){
    while (element.firstChild){
        element.removeChild(element.firstChild)
    }
} 


render();