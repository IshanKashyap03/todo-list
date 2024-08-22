import Project from "./Projects";
import { saveDataToLocalStorage } from "./localstorageFuctions";

export default class ProjectManager{
    
    constructor(projects = []){
        this.projects = projects.map(projectData => new Project(projectData.title));
    }

    addProjects(title, todoManager){
        const project = new Project(title);
        if (!this.projects.some(proj => proj.title === title)) {
            this.projects.push(project);
        }

        todoManager.getTodos().forEach(todo => {
            if (!todo.project.some(proj => proj.title === title)) {
                todo.project.push(project);
            }
        });

        saveDataToLocalStorage(todoManager, this); 
    }

    removeProjects(index, todoManager){
        const projectToRemove = this.projects[index];
        this.projects.splice(index, 1);
        console.log(todoManager.getTodos());
        todoManager.getTodos().forEach(todo => {
            todo.project = todo.project.filter(project => project != projectToRemove);
        });

        saveDataToLocalStorage(todoManager, this); 
    }

    getProjects() {
        return this.projects;
    }
}