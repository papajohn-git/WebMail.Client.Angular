import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../interfaces/apirespone/apiresponse';
import { environment } from '../../../environments/environment.development';
import { Todo, CreateTodoDTO } from '../interfaces/todo/todo';

const API_URL=`${environment.apiURL}/api/Todo`;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http: HttpClient = inject(HttpClient)

  getListOfTodos() {
    return this.http.get<Todo[]>
    (`${API_URL}/GetTodos`);
  }

  addTodo(task: CreateTodoDTO){

    return this.http.post<ApiResponse>
    (`${API_URL}/AddTodo`, task);
  }

  deleteTodo(todoId: number) {
    return this.http.delete<ApiResponse>
    (`${API_URL}/DeleteTodo/${todoId}`);
  }

  completeTodo(todoId: number) {
    return this.http.put<ApiResponse>
    (`${API_URL}/CompleteTodo/${todoId}`, null);
  }
}