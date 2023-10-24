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

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatTableModule,
        StoreModule.forRoot({
          todos: todoReducer
        }, {}),
        EffectsModule.forRoot([ TodoEffects ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
