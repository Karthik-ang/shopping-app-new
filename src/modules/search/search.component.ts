import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'search-comp',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  title = 'shopping-app';
  searchText = '';
  @Input() shoppingItems = [];
  @Output() filterChange = new EventEmitter();
  @Input() isMobile = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  search() {
    if (this.searchText != '') {
      this.getShoppingItems().subscribe((response => {
        if (response) {
          this.shoppingItems = response;
          this.shoppingItems.forEach(element => {
            element.discountValue = element.price * (element.discount / 100)
            element.originalPrice = element.price + element.discountValue;
          });
          const items = this.shoppingItems.filter(item =>
            item.name.toLowerCase().includes(this.searchText.toLowerCase()));
          this.filterChange.emit(items);
        }
      }));
    } else {
      this.getShoppingItems().subscribe((response => {
        if (response) {
          this.shoppingItems = response;
          this.shoppingItems.forEach(element => {
            element.discountValue = element.price * (element.discount / 100)
            element.originalPrice = element.price + element.discountValue;
          });
          this.filterChange.emit(this.shoppingItems);
        }
      }));
    }
  }

  getShoppingItems() {
    const url = 'https://api.myjson.com/bins/qzuzi';
    var response: any;
    response = this.http.get(url);
    return response;
  }
}

