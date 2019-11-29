import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'search-comp',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  title = 'shopping-app';
  searchText = '';
  displaySearch = false;
  @Input() shoppingItems = [];
  @Output() filterChange = new EventEmitter();
  @Input() isMobile = false;
  @Input() isCartPage = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  search() {
    if (this.searchText != '') {
      this.getShoppingItems().subscribe((response => {
        if (response) {
          this.shoppingItems = response;
          this.shoppingItems.forEach(element => {
            element.discountValue = element.price * (element.discount / 100);
            element.originalPrice = element.price + element.discountValue;
          });
          const items = this.shoppingItems.filter(item =>
            item.name.toLowerCase().includes(this.searchText.toLowerCase()));
          if (!this.isCartPage) {
            this.filterChange.emit(items);
          } else {
            this.navigate(items);
          }
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
          if (!this.isCartPage) {
            this.filterChange.emit(this.shoppingItems);
          } else {
            this.navigate(this.shoppingItems);
          }
        }
      }));
    }
  }
  navigate(items) {
    if (this.isCartPage) {
      this.router.navigate([''], { state: { example: items } })
    }
  }
  getShoppingItems() {
    const url = 'https://api.myjson.com/bins/qzuzi';
    var response: any;
    response = this.http.get(url);
    return response;
  }
  showSearch(event) {
    this.displaySearch = !event;
  }
}

