import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() darkTheme: boolean;
  @Input() firstItem: boolean;
  @Input() content: string;
  @Input() checked: boolean;
  @Output() completeEvent: EventEmitter<string>;
  @Output() removeEvent: EventEmitter<string>;

  constructor() {
    this.darkTheme = false;
    this.firstItem = false;
    this.content = "";
    this.checked = false;
    this.completeEvent = new EventEmitter();
    this.removeEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onChecked(event: any) {
    if (event.checked) {
      this.checked = true;
    } else {
      this.checked = false;
    }
    this.completeEvent.emit(this.content);
  }

  onClick(event: any) {
    this.removeEvent.emit(this.content);
  }
}
