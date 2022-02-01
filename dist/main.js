/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const projectsContainer = document.querySelector('[data-projects]');\nconst newProjectForm = document.querySelector('[data-new-project-form]');\nconst newProjectInput = document.querySelector('[data-new-project-input]');\nconst deleteProjectButton = document.querySelector('[data-delete-project]');\nconst listDisplayContainer = document.querySelector('[data-list-display-container]')\nconst listTitle = document.querySelector('[data-list-title]');\nconst listCount = document.querySelector('data-list-count');\nconst tasksContainer = document.querySelector('[data-tasks]')\n\n\n//Storage Keys\nconst LOCAL_STORAGE_PROJECT_KEY = 'project.lists';\nconst LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'project.selectedId'\n\nlet projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];\nlet selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);\n\n\n\nprojectsContainer.addEventListener('click', (e) => {\n    if (e.target.tagName.toLowerCase() === 'li'){\n        selectedProjectId = e.target.dataset.projectId\n        save()\n        render()\n        \n    }\n})\n\n\n\n//Create a new project\nnewProjectForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const projectName = newProjectInput.value;\n    if (projectName === null || projectName === \"\") return alert(\"ERROR\"); \n    const project = createProject(projectName)\n    newProjectInput.value = null;\n    projects.push(project);\n    render();\n    save();\n})\n\n//delete a project from a list\ndeleteProjectButton.addEventListener('click', (e) => {\n    projects = projects.filter(project => project.id !== selectedProjectId)\n    selectedProjectId = null\n    save();\n    render();\n})\n\n//Returns Object -> Gives Projects a unique ID\nfunction createProject(name){\n    return {id: Date.now().toString(), name: name, tasks: [] }\n}\n\n//save to local storage\nfunction save(){\n    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));\n    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, selectedProjectId);\n}\n\nfunction render(){\n    clearElement(projectsContainer)\n    renderProjects()\n    const selectedProject = projects.find(project => project.id === selectedProjectId);\n\n    if (selectedProjectId === null){\n        listDisplayContainer.style.display = 'none';\n    } else {\n        listDisplayContainer.style.display = ''\n        listTitle.innerText = selectedProject.name\n        renderTaskCount(selectedProject)\n    }\n}\n\nfunction renderTaskCount(selectedProject){\n    const incompleteTasksCount = selectedProject.tasks.filter(task => !task.complete).length\n    const taskString = incompleteTasksCount === 1 ? 'task':'tasks';\n    listCount.innerText = `${incompleteTasksCount} ${taskString} remaining`\n}\n\n\n\n//Add projects to side bar\nfunction renderProjects(){\n    clearElement(projectsContainer);\n    projects.forEach(project => {\n        const projectElement = document.createElement('li');\n        projectElement.dataset.projectId = project.id;\n        projectElement.classList.add('project-name');\n        projectElement.innerText = project.name;\n        if(project.id === selectedProjectId) {\n            projectElement.classList.add('active-project')\n        }\n        projectsContainer.appendChild(projectElement)\n    })\n}\n\n//clears bar after submit\nfunction clearElement(element){\n    while (element.firstChild){\n        element.removeChild(element.firstChild)\n    }\n} \n\n\nrender();\n\n//# sourceURL=webpack://to-do/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;