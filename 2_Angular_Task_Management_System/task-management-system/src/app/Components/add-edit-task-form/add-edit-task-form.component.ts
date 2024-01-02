import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../Services/core.service';
import { Iuser } from '../../Interfaces/Iuser';
import { Itask } from '../../Interfaces/Itask';

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrl: './add-edit-task-form.component.css'
})
export class AddEditTaskFormComponent {
  taskService: TaskService = inject(TaskService);
  coreService: CoreService = inject(CoreService);

  taskForm!: FormGroup;
  categories: string[] = [
    "General", "Event", "Family/Home", "Finance", "Friends", "Health", "Hobby", "Learning", "Party", "Self-Care", "Shopping", "Study", "Travel", "Volunteer", "Work", "Workout", "Other"
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: { id: number },
    @Inject(MAT_DIALOG_DATA) public dialogData: { userData: Iuser, task: Itask }
  ) {
    this.taskForm = this.fb.group({
      title: this.dialogData.task ? this.dialogData.task.title : '',
      category: this.dialogData.task ? this.dialogData.task.category : '',
      duedate: this.dialogData.task ? this.dialogData.task.duedate : '',
      completed: this.dialogData.task ? this.dialogData.task.completed : ''
    });
  }

  onTaskSubmit(): void {
    if (this.taskForm.valid) {
      if (this.taskForm.value.title.trim() !== '' && isNaN(Number(this.taskForm.value.title))
        && this.taskForm.value.category !== '' && this.taskForm.value.duedate !== '') {
        if (this.dialogData.task) {
          this.updateTask();
        }
        else {
          this.createNewTask();
        }
      }
    }
    else {
      this.coreService.openSanckBar('Task cannot be created!');
    }
  }

  createNewTask(): void {
    this.taskService.addTask(this.userData.id, this.taskForm.value).subscribe({
      next: (data) => {
        this.coreService.openSanckBar('Task added Sucessfully!');
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  updateTask(): void {
    this.taskService.updateTask(this.dialogData.userData, this.dialogData.task, this.taskForm.value).subscribe({
      next: (data) => {
        this.coreService.openSanckBar('Task updated Sucessfully!');
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
