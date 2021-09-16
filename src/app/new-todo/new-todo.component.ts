import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  @Input() darkTheme: boolean;
  @Output() newTodoEvent: EventEmitter<string>;
  content: string;

  constructor() {
    this.darkTheme = false;
    this.content = "";
    this.newTodoEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onChecked(event: any) {
    event.source.checked = false;
    this.newTodoEvent.emit(this.content);
    this.content = "";
  }
}
