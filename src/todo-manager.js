import Todo from "./Todos";

export default class TodoManager {
    constructor(){
        this.todos = [];
    }

    addTodos(title, description, dueDate, priority, completed, project){
        const todo = new Todo(title, description, dueDate, priority, completed, project);
        console.log("todo: ", todo);
        this.todos.push(todo);
    }

    removeTodo(index){
        this.todos.splice(index, 1);
    }

    getTodos() {
        return this.todos;
    }
}