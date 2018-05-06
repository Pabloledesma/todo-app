import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(
    private todoProvider: TodoProvider,
    public navCtrl: NavController, 
    private alertController: AlertController
  ) {
    this.todos = this.todoProvider.getTodos();
  }

  toggleReorder(){ 
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }
  
  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add a Todo",
      message: "Enter a todo",
      inputs:[
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {text: "Cancel"},
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);
          }
        }
      ] 
    });

    addTodoAlert.present();
  }

}
