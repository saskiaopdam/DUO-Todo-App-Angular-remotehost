import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Todo } from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  // toggleChecked(id: number): Observable<Todo> {
  //   return this.http.put<Todo>('http://localhost:8080/todo/' + id, todo
  //   );
  // }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:8080/todo', todo);
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://localhost:8080/todo/' + todo.id, todo
    );
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://localhost:8080/todo/' + todo.id, todo
    );
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/todo/' + id)
  }

  load(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:8080/todo')
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(
        'http://localhost:8080/todo/' + id
    );
  }
}
