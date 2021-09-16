import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

class TodoItem {
  text: string;
  complete: boolean;

  constructor(text: string, complete: boolean = false) {
    this.text = text;
    this.complete = complete;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
  darkTheme: boolean = false;
  filter: string = "all";
  todos: TodoItem[] = [
    new TodoItem("Jog around the park"),
    new TodoItem("10 minutes meditation"),
    new TodoItem("Read for 1 hour"),
    new TodoItem("Pick up groceries"),
    new TodoItem("Complete Todo App on Frontend Mentor"),
  ];

  toggleTheme(event: any) {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
    } else {
      document.body.style.backgroundColor = "hsl(236, 33%, 92%)";
    }
    this.selectImage(document.body.clientWidth);
  }

  onResize(event: any) {
    this.selectImage(event.target.outerWidth);
  }

  selectImage(width: number) {
    if (width <= 768) {
      if (this.darkTheme) {
        document.body.style.backgroundImage = "url(./assets/bg-mobile-dark.jpg)";
      } else {
        document.body.style.backgroundImage = "url(./assets/bg-mobile-light.jpg)";
      }
    } else {
      if (this.darkTheme) {
        document.body.style.backgroundImage = "url(./assets/bg-desktop-dark.jpg)";
      } else {
        document.body.style.backgroundImage = "url(./assets/bg-desktop-light.jpg)";
      }
    }
  }

  addTodoItem(event: any) {
    this.todos.push(new TodoItem(event));
  }

  itemsLeft(): number {
    let counter = 0;
    for (let todo of this.todos) {
      if (!todo.complete) {
        counter++;
      }
    }
    return counter;
  }

  completedLeft(): number {
    let counter = 0;
    for (let todo of this.todos) {
      if (todo.complete) {
        counter++;
      }
    }
    return counter;
  }

  toggleComplete(event: any) {
    for (let todo of this.todos) {
      if (todo.text === event) {
        todo.complete = !todo.complete;
      }
    }
  }

  removeTodo(event: any) {
    let newTodos: TodoItem[] = [];
    for (let todo of this.todos) {
      if (todo.text !== event) {
        newTodos.push(new TodoItem(todo.text, todo.complete));
      }
    }
    this.todos = newTodos;
  }

  changeFilter(event: any) {
    this.filter = event;
  }

  isFirstItem(todo: TodoItem): boolean {
    if (this.filter === "all") {
      if (todo === this.todos[0]) {
        return true;
      }
    } else if (this.filter === "active") {
      for (let item of this.todos) {
        if (!item.complete) {
          if (item === todo) {
            return true;
          }
          break;
        }
      }
    } else if (this.filter === "completed") {
      for (let item of this.todos) {
        if (item.complete) {
          if (item === todo) {
            return true;
          }
          break;
        }
      }
    }
    return false;
  }

  clearCompleted(event: any) {
    let newTodos: TodoItem[] = [];
    for (let todo of this.todos) {
      if (!todo.complete) {
        newTodos.push(todo);
      }
    }
    this.todos = newTodos;
  }

  drop(event: CdkDragDrop<TodoItem[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
