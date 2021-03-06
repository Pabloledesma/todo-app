import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private todos = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getTodos(){
    return this.todos;
  }

  getArchivedTodos(){
    return this.archivedTodos;
  }

  addTodo(todo){
    this.todos.push(todo); 
  }

  editTodo(todo, todoIndex){
    this.todos[todoIndex] = todo;
  }

  archiveTodo(todoIndex){
    this.archivedTodos.push(this.todos[todoIndex]);
    this.todos.splice(todoIndex, 1);
  }

}
