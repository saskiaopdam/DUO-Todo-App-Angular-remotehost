import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

// angular material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

// ngrx state management
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import { counterReducer } from "./counter.reducer";
import { MyCounterComponent } from './my-counter/my-counter.component';
import { todoReducer } from "./todo.reducers";
import { TodoEffects } from "./todo.effects"

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoDetailComponent,
    MyCounterComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        // angular material modules
        BrowserAnimationsModule,
        MatSlideToggleModule,
        StoreModule.forRoot({
          count: counterReducer,
          todos: todoReducer
        }, {}),
        EffectsModule.forRoot([ TodoEffects ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
