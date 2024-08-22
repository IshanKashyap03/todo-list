import Project from "./Projects";

export default class ProjectManager{
    
    constructor(){
        this.projects = [new Project("default")];
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
    }

    removeProjects(index, todoManager){
        const projectToRemove = this.projects[index];
        this.projects.splice(index, 1);
        console.log(todoManager.getTodos());
        todoManager.getTodos().forEach(todo => {
            todo.project = todo.project.filter(project => project != projectToRemove);
        });
    }

    getProjects() {
        return this.projects;
    }
}