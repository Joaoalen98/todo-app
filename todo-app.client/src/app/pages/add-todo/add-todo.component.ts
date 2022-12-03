import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTodoModel } from 'src/app/interfaces/create-todo.model';
import { TodoService } from 'src/app/services/todo-service.service';

declare let alertify: any;

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public form!: FormGroup

  constructor(private todoService: TodoService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl('')
    });
  }

  public adicionarTodo() {
    const titulo = this.form.value.titulo;

    const createTodo: CreateTodoModel = {
      title: titulo,
    }

    this.todoService.postTodo(createTodo).subscribe(x => {
      alertify.success("Tarefa salva com sucesso!");
      this.router.navigate(["/"]);
    });
  }

}
