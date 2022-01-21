import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //Global variables
  title = 'To Do List';
  task: string = '';
  tasks: string[] = [];
  allTasks: object = {};

  constructor() {
    //calling the method for get the data of localStorage
    this.getTasksFromLocalStorage();
  }

  //methods

  //this is the method for save the data in the localStorage
  save() {
    this.allTasks = {
      todo: this.tasks,
    };
    localStorage.setItem('Task', JSON.stringify(this.allTasks));
  }

  //this is the method for add the data in the localStorage
  addTask(task: string) {
    if (task !== '') {
      this.tasks.push(task);
      this.task = '';
      this.save();
      console.log(this.tasks);
    } else {
      alert('Field required **');
    }
  }

  //this is the method for get the data in the localStorage
  getTasksFromLocalStorage() {
    const data = localStorage.getItem('Task');
    if (data) {
      let result = JSON.parse(data).todo;
      //console.log(result);
      this.tasks = [...result];
    }
  }

  //this is the method for delete the data in the localStorage
  deleteTask(todo: string) {
    //this de code of a modal from SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this task: ' + todo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < this.tasks.length; i++) {
          if (todo == this.tasks[i]) {
            this.tasks.splice(i, 1);
            this.save();
          }
        }
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your task is safe :)', 'error');
      }
    });
  }

  //this is an async method for edit the data in the localStorage
  async editTask(todo: string) {
    //this de code of a modal from SweetAlert
    const { value: text } = await Swal.fire({
      title: 'Edit Your Task',
      input: 'text',
      inputLabel: todo,
      inputValue: todo,
      showCancelButton: true,
    });
    if (text) {
      Swal.fire('Edited!', 'Your task has been edited.', 'success');
      for (let i = 0; i < this.tasks.length; i++) {
        if (todo === this.tasks[i]) {
          this.tasks[i] = text || todo;
        }
      }
      this.save();
    }
  }
}
