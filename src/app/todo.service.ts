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

  add(todo: Todo): Observable<Todo> {
    // return this.http.post<Todo>('http://localhost:8080/todo', todo);
    return this.http.post<Todo>('http://m1y7g7.stackhero-network.com:4656/todo', todo);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://m1y7g7.stackhero-network.com:4656/todo/' + todo.id, todo
    );
  }

  delete(id: number) {
    return this.http.delete('http://m1y7g7.stackhero-network.com:4656/todo/' + id)
  }

  load(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://m1y7g7.stackhero-network.com:4656/todo')
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://m1y7g7.stackhero-network.com:4656/todo/' + todo.id, todo
    );
  }

}
