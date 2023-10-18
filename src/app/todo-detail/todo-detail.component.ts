import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Todo } from "../todo.model";
import { TodoService } from "../todo.service";
import { requestUpdateAction } from "../todo.actions";
import { AppState } from "../todo.reducer";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo = {id: 0, task: '', checked: false};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private store: Store<AppState>
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

  update(): void {
    if (this.todo) {
      this.store.dispatch(requestUpdateAction({ todo: this.todo }));
      this.router.navigate(['/']);
    }
  }
}
