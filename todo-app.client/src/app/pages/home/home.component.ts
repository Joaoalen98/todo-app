import { Component, OnInit, } from '@angular/core';
import { TodoModel } from 'src/app/interfaces/todo.model';
import { TodoService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public carregandoTodos: boolean = true;
  public todos: TodoModel[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  public getTodos() {
    this.carregandoTodos = true;

    this.todoService.getTodos()
      .subscribe(x => {
        this.todos = x;
        this.carregandoTodos = false;
      });
  }
}
