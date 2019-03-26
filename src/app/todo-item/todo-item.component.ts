import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  //
  // Inputs
  //

  @Input()
  public id: number;

  @Input()
  public assignedTo?: string;

  @Input()
  public description: string;

  @Input()
  public done: boolean;

  //
  // Outputs
  //

  @Output()
  public edit = new EventEmitter<void>();

  @Output()
  public complete = new EventEmitter<void>();

  @Output()
  public delete = new EventEmitter<void>();

  //
  // Event handlers
  //

  public onEditClicked() {
    this.edit.emit();
  }

  public onCompleteClicked() {
    this.complete.emit();
  }

  public onDeleteClicked() {
    this.delete.emit();
  }
}
