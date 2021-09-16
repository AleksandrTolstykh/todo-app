import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() darkTheme: boolean;
  @Input() itemsLeft: number;
  @Input() completedItems: number;
  @Output() filterChangedEvent: EventEmitter<string>;
  @Output() clearCompletedEvent: EventEmitter<boolean>;
  filter: string;

  constructor() {
    this.darkTheme = false;
    this.itemsLeft = 0;
    this.completedItems = 0;
    this.filterChangedEvent = new EventEmitter();
    this.clearCompletedEvent = new EventEmitter();
    this.filter = "all";
  }

  ngOnInit(): void {
  }

  clearSelectedFilter() {
    var elems = document.querySelectorAll(".selected-filter");
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove("selected-filter");
    };
  }

  onAllClick(event: any) {
    this.clearSelectedFilter();
    document.querySelectorAll(".all-button")[0].classList.add("selected-filter");
    this.filterChangedEvent.emit("all");
    this.filter = "all;"
  }

  onActiveClick(event: any) {
    this.clearSelectedFilter();
    document.querySelectorAll(".active-button")[0].classList.add("selected-filter");
    this.filterChangedEvent.emit("active");
    this.filter = "active";
  }

  onCompletedClick(event: any) {
    this.clearSelectedFilter();
    document.querySelectorAll(".completed-button")[0].classList.add("selected-filter");
    this.filterChangedEvent.emit("completed");
    this.filter = "completed";
  }

  onClearClick(event: any) {
    this.clearCompletedEvent.emit(true);
  }
}
