import { Component, Input, OnInit } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodoService } from "../todo.service";
import { Todo } from "../todo";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todo = new Todo();

  @Input()
  todoList!: TodoListComponent;

  constructor(public todoService: TodoService) {}
  ngOnInit(): void {}

  addTodo() {
    this.todoService.addTodo(this.todo).subscribe(
      () => this.todoList.getTodos())
  }

}
