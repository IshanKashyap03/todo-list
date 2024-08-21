import Project from "./Projects";

export default class ProjectManager{
    
    constructor(){
        this.projects = [];
    }

    addProjects(title){
        const project = new Project(title);
        this.projects.push(project);
    }

    removeProjects(index){
        this.projects.splice(index, 1);
    }

    getProjects() {
        return this.projects;
    }
}