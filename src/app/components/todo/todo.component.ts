import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo, CreateTodoDTO } from '../../shared/interfaces/todo/todo';
import { TodoService } from '../../shared/services/todo.service';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: string = '';
  newTask: CreateTodoDTO = { task: '' };
  todoService = inject(TodoService);

  todoForm: FormGroup = new FormGroup({
    task: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getListOfTodos().subscribe(todos => {
      console.log('todos', todos);
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.newTask.task = this.newTodo;
      this.todoService.addTodo(this.newTask).subscribe({
        next: (response) => {
          if (response.success) {

            console.log('Todo added successfully');
            this.newTodo = '';
            this.loadTodos();
          }
        },
        error: (error) => {
          console.error('Error adding todo', error);
        }
      });
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadTodos();
          console.log('Todo deleted successfully', response.message);
        }
      },
      error: (error) => {
        console.error('Error completing todo', error);
      }
    });
  }

  completeTodo(id: number): void {
    this.todoService.completeTodo(id).subscribe({
      next: (response) => {
        if (response.success) {
          // this.loadTodos();
          const todo = this.todos.find(t => t.id === id);
          if (todo) {
            todo.isCompleted = true;
          }
          // console.log('Todo completed successfully',response.message);
        }
      },
      error: (error) => {
        console.error('Error completing todo', error);
      }
    });
  }

}
