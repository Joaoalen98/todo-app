import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateTodoModel } from 'src/app/interfaces/create-todo.model';
import { EditTodoModel } from 'src/app/interfaces/edit-todo.model';
import { TodoModel } from 'src/app/interfaces/todo.model';
import { TodoService } from 'src/app/services/todo-service.service';

declare let alertify: any;

@Component({
  selector: 'app-card-todo',
  templateUrl: './card-todo.component.html',
  styleUrls: ['./card-todo.component.scss']
})
export class CardTodoComponent implements OnInit {

  @Input() todo!: TodoModel;
  @Output() atualizaTodos = new EventEmitter();
  public formEdicao!: FormGroup;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.formEdicao = new FormGroup({
      titulo: new FormControl(this.todo.title),
      completo: new FormControl(this.todo.done),
    });
  }

  editarTodo() {
    const editTodo: EditTodoModel = {
      title: this.formEdicao.value.titulo,
      done: this.formEdicao.value.completo,
    }

    this.todoService.editTodo(editTodo, this.todo.id).subscribe(x => {
      alertify.success("Todo editado com sucesso");
      this.atualizaTodos.emit(this.todo);
    });
  }

  deletarTodo() {
    const id = this.todo.id;

    this.todoService.deleteTodo(id).subscribe(x => {
      alertify.success("Deletado com succeso");
      this.atualizaTodos.emit(this.todo);
    });
  }
}
