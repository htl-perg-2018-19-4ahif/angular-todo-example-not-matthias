import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { NewTodoDialogComponent } from './new-todo-dialog/new-todo-dialog.component';

//
//
// Interfaces
//
//
export interface IPerson {
  name: string;
}

export interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean;
}

interface IDialogData {
  todo: ITodoItem;
  people: IPerson[];
}

enum STATUS {
  ALL = 'all',
  DONE = 'done',
  NOT_DONE = 'not_done'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly apiUrl = 'http://localhost:8081/api';

  public todos: ITodoItem[] = [];
  public people: IPerson[] = [];

  public statusFilter = '';
  public personFilter = '';

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  //
  // Init function: fetches the data from the server
  //
  ngOnInit() {
    this.fetchTodos();
    this.fetchPeople();
  }

  //
  //
  // Misc
  //
  //

  //
  // Opens the edit dialog (used for creating and updating todos)
  //
  public async openDialog(oldTodo?: ITodoItem) {
    //
    // Open the dialog
    //
    const dialogRef = this.dialog.open(NewTodoDialogComponent, {
      width: '230px',
      data: {
        todo: {
          ...oldTodo
        },
        people: this.people
      }
    });

    try {
      //
      // Receive the todo from the dialog
      //
      const dialogData: IDialogData = await dialogRef.afterClosed().toPromise();

      //
      // Update the todo if passed per parameter
      //
      if (dialogData && oldTodo) {
        this.updateTodo(dialogData.todo);
      } else {
        this.createTodo(dialogData.todo);
      }
    } catch (error) {
      console.log('[DEBUG] An error occured while exiting the dialog.');
    }
  }

  //
  // Completes a todo
  //
  public completeTodo(todo: ITodoItem) {
    if (todo) {
      //
      // Set the done boolean
      //
      todo.done = true;

      //
      // Update the todo
      //
      this.updateTodo(todo);
    }
  }

  //
  //
  // Filters
  //
  //

  //
  // Compare the assigned person with the filter
  //
  public matchesPersonFilter(todo: ITodoItem) {
    //
    // No filter specified
    //
    if (!this.personFilter) {
      return true;
    }

    return todo.assignedTo === this.personFilter;
  }

  //
  // Compare the status with the filter
  //
  public matchesStatusFilter(todo: ITodoItem): boolean {
    //
    // No filter specified
    //
    if (!this.statusFilter) {
      return true;
    }

    switch (this.statusFilter) {
      case STATUS.DONE:
        return !!todo.done;

      case STATUS.NOT_DONE:
        return !todo.done;

      case STATUS.ALL:
        return true;
    }
  }

  //
  // Getter for the todos (can be filtered)
  //
  get filteredTodos() {
    return this.todos.filter(
      (values: ITodoItem) => this.matchesPersonFilter(values) && this.matchesStatusFilter(values)
    );
  }

  //
  //
  // API Requests
  //
  //

  //
  // Updates an existing todo
  //
  private async updateTodo(todo: ITodoItem) {
    try {
      //
      // Update it on the server
      //
      const updatedTodo = await this.http.patch<ITodoItem>(`${this.apiUrl}/todos/${todo.id}`, todo).toPromise();

      //
      // Update it in the list
      //
      this.todos = this.todos.map((value: ITodoItem) => (value.id === todo.id ? updatedTodo : value));
    } catch (error) {
      console.log('[DEBUG] Failed to patch todo.');
    }
  }

  //
  // Creates a new todo
  //
  private async createTodo(todo: ITodoItem) {
    //
    // Add it on the server
    //
    const newTodo = await this.http.post<ITodoItem>(`${this.apiUrl}/todos`, todo).toPromise();

    //
    // Add it to the list
    //
    this.todos.push(newTodo);
  }

  //
  // Deletes an existing todo
  //
  private async deleteTodo(todo: ITodoItem) {
    try {
      //
      // Delete it on the server
      //
      await this.http.delete(`${this.apiUrl}/todos/${todo.id}`).toPromise();

      //
      // Delete it from the list
      //
      this.todos = this.todos.filter((value: ITodoItem) => value.id !== todo.id);
    } catch (error) {
      console.log('[DEBUG] Failed to delte todo item.');
    }
  }

  //
  //
  // Fetch stuff
  //
  //

  //
  // Fetches the todo array from the server
  //
  private async fetchTodos() {
    try {
      this.todos = await this.http.get<ITodoItem[]>(`${this.apiUrl}/todos`).toPromise();
    } catch (error) {
      console.log('[DEBUG] Failed to fetch todos.');
    }
  }

  //
  // Fetches the people array from the server
  //
  private async fetchPeople() {
    try {
      this.people = await this.http.get<IPerson[]>(`${this.apiUrl}/people`).toPromise();
    } catch (error) {
      console.log('[DEBUG] Failed to fetch people.');
    }
  }
}
