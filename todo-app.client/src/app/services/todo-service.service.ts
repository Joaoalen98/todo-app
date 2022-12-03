import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { CreateTodoModel } from '../interfaces/create-todo.model';
import { EditTodoModel } from '../interfaces/edit-todo.model';
import { TodoModel } from '../interfaces/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  public getTodos(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(apiUrl + "/todos");
  }

  public postTodo(model: CreateTodoModel) {
    return this.httpClient.post(apiUrl + "/todos", model);
  }

  public editTodo(model: EditTodoModel, id: number) {
    return this.httpClient.put(apiUrl + `/todos/${id}`, model);
  }

  public deleteTodo(id: number) {
    return this.httpClient.delete(apiUrl + `/todos/${id}`);
  }
}
