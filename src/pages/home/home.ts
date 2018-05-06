import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];

  constructor(public navCtrl: NavController, private alertController: AlertController) {

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
            this.todos.push(todoText);
          }
        }
      ] 
    });

    addTodoAlert.present();
  }

}
