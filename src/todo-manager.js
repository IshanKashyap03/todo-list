import Todo from "./Todos";
import { saveDataToLocalStorage } from "./localstorageFuctions";

export default class TodoManager {
    constructor(todos = []){
        this.todos = todos.map(todoData => new Todo(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.priority,
            todoData.completed,
            todoData.project
        ));
    }

    addTodos(title, description, dueDate, priority, completed, project, projectManager){
        const todo = new Todo(title, description, dueDate, priority, completed, project);
        console.log("todo: ", todo);
        this.todos.push(todo);
        saveDataToLocalStorage(this, projectManager); 
    }

    removeTodo(index, projectManager){
        this.todos.splice(index, 1);
        saveDataToLocalStorage(this, projectManager); 
    }

    getTodos() {
        return this.todos;
    }
}