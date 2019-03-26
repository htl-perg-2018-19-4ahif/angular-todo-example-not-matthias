import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatCommonModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NewTodoDialogComponent } from './new-todo-dialog/new-todo-dialog.component';

@NgModule({
  declarations: [AppComponent, TodoItemComponent, NewTodoDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatCommonModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewTodoDialogComponent]
})
export class AppModule {}
