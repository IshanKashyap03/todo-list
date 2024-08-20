import Todo from "./Todos";

export default class TodoManager {
    constructor(){
        this.todos = [];
    }

    addTodos(title, description, dueDate, priority, completed){
        const todo = new Todo(title, description, dueDate, priority, completed);
        this.todos.push(todo);
    }

    removeTodo(index){
        this.todos.splice(index, 1);
    }

    getTodos() {
        return this.todos;
    }
}