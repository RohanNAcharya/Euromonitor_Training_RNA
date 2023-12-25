import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService, task } from '../Services/task.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../Services/auth.service';

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrl: './add-edit-task-form.component.css'
})
export class AddEditTaskFormComponent {
  taskForm!: FormGroup;
  categories: string[] = ["General", "Work", "Shopping", "Study", "Hobby", "Family", "Friends", "Party", "Other"];
  taskService: TaskService = inject(TaskService);
 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: { id: number },
    @Inject(MAT_DIALOG_DATA) public dialogData: { userData: User, task: task }
  ){
    this.taskForm = this.fb.group({
      title: this.dialogData.task ? this.dialogData.task.title : '',
      category: this.dialogData.task ? this.dialogData.task.category : '',
      duedate: this.dialogData.task ? this.dialogData.task.duedate : '',
      completed: false
    });
  }

  onTaskSubmit(){
    if(this.taskForm.valid){
      if(this.dialogData.task){
        this.taskService.updateTask(this.dialogData.userData, this.dialogData.task, this.taskForm.value).subscribe({
          next: (data) => {
            alert('Task updated Sucessfully!');
            this.dialogRef.close(true);
          },
          error: (err: any) =>{
            console.log(err);
          }
        })
      }
      else{
        this.taskService.addTask(this.userData.id, this.taskForm.value).subscribe({
          next: (data) => {
            alert('Task added Sucessfully!');
            this.dialogRef.close(true);
          },
          error: (err: any) =>{
            console.log(err);
          }
        })
      }
      }  
  }
}
