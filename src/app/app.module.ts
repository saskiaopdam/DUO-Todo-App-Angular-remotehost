import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { todoReducer } from "./todo.reducer";
import { TodoEffects } from "./todo.effects";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({
          todos: todoReducer
        }, {}),
        EffectsModule.forRoot([ TodoEffects ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
