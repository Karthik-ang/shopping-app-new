import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
})

export class ShoppingListComponent implements OnInit {
  name = 'Angula';
  @Input() cartItems = [];
  @Output() cartChange = new EventEmitter();
  @Input() shoppingItems = [];
  @Input() isMobile = false;
  constructor() { }

  ngOnInit() {


  }

  addItem(item) {
    this.cartChange.emit(item);
  }
}
