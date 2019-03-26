import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITodoItem, IPerson } from '../app.component';

@Component({
  selector: 'app-new-todo-dialog',
  templateUrl: './new-todo-dialog.component.html',
  styleUrls: ['./new-todo-dialog.component.css']
})
export class NewTodoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo: ITodoItem; people: IPerson[] }
  ) {}

  public onCancel() {
    this.dialogRef.close();
  }
}
