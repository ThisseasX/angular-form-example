import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { TodoService } from "../todo/todo.service";
import { BehaviorSubject } from "rxjs";
import { Todo } from "../types/Todo";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  todos$: BehaviorSubject<Todo[]>;

  newTodo = new FormGroup({
    title: new FormControl(""),
    completed: new FormControl(false),
  });

  constructor(private todoService: TodoService) {
    this.todos$ = todoService.getTodos();
  }

  ngOnInit() {
    console.log("Init!");
    this.todoService.fetchTodos();
  }

  onKeyDown(event: any) {
    if (event.key === "Enter" && this.newTodo.value.title) {
      this.saveTodo();
    }
  }

  saveTodo() {
    this.todoService.saveTodo(this.newTodo.value);
    this.newTodo.reset();
  }
}
