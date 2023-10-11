import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo = new Todo();

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.getTodo();
  }

  // getTodo(): void {
  //   const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  //   console.log(`id: ${id}`);
  //   this.todoService.getTodo(id)
  //     .subscribe(todo => {
  //       this.todo = todo;
  //       console.log(`task: ${this.todo.task}`);
  //     });
  // }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   if (this.todo) {
  //     this.todoService.updateTodo(this.todo)
  //       .subscribe(() => this.goBack());
  //   }
  // }
}
