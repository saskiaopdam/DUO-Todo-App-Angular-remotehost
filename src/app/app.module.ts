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
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
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
