import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Store } from "@ngrx/store";

import { Todo } from "../todo.model";
import { TodoService } from "../todo.service";
import { requestUpdateAction } from "../todo.actions";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo = {id: 0, task: ''};

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private store: Store<{ todos: Todo[] }>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getTodo();
    });
  }

  getTodo(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.todoService.getTodo(id)
      .subscribe(todo => {
        this.todo = todo;
      });
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (this.todo) {
      this.store.dispatch(requestUpdateAction({ todo: this.todo }));
      this.goBack();
    }
  }
}
