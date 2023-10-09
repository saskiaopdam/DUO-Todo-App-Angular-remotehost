import { Component, OnInit } from '@angular/core';

import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      () => this.getTodos()
    )
  }
}
