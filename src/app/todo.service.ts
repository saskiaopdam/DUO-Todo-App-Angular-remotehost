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

  private apiUrl = 'https://duo-todo-app-java-5b713e6535ff.herokuapp.com/todo';  // Update with your Heroku app URL
  
  constructor(public http: HttpClient) { }

  add(todo: Todo): Observable<Todo> {
    // return this.http.post<Todo>('http://localhost:8080/todo', todo);
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + "/" + todo.id, todo
    );
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + "/" + id)
  }

  load(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + "/" + todo.id, todo
    );
  }

}
