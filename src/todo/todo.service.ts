import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { take } from "lodash/fp";
import { BehaviorSubject } from "rxjs";
import { Todo } from "../types/Todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.todos$;
  }

  fetchTodos() {
    this.http
      .get("https://jsonplaceholder.typicode.com/todos")
      .subscribe((todos: Todo[]) => {
        const firstTodos = take(6, todos);
        this.todos$.next(firstTodos);
      });
  }

  saveTodo(newTodo: string) {
    console.log({ newTodo });

    this.http
      .post("https://jsonplaceholder.typicode.com/todos", newTodo)
      .subscribe((newTodo) => {
        this.todos$.next([...this.todos$.value, newTodo]);
      });
  }
}
