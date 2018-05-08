import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";
import { ArchivedTodosPage } from "../archived-todos/archived-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(
    private toastController: ToastController,
    private todoProvider: TodoProvider,
    public navCtrl: NavController, 
    private alertController: AlertController
  ) {
    this.todos = this.todoProvider.getTodos();
  }

  goToArchivedPage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){ 
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }
  
  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit Todo",
      message: "Enter a todo",
      inputs:[
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {text: "Cancel"},
        {
          text: "Edit todo",
          handler: (data) => {
            this.todoProvider.editTodo(data.editTodoInput, todoIndex);

            editTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo edited successfully!",
                duration: 2000
              });
  
              addTodoToast.present();
            });
          }
        }
      ] 
    });

    editTodoAlert.present();
    
  }

  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
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

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo added successfully!",
                duration: 2000
              });
  
              addTodoToast.present();
            });
          }
        }
      ] 
    });

    addTodoAlert.present();
  }

}
