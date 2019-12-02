import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../shopping.service';
import { ShoppingCartFacade } from '../shopping-cart.facade';

@Component({
  selector: 'search-comp',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  title = 'shopping-app';
  displaySearch = false;
  @Input() shoppingItems = [];
  @Output() filterChange = new EventEmitter();
  @Input() isMobile = false;
  @Input() isCartPage = false;
  constructor(private router: Router, private shoppingService: ShoppingService, public cartFacade: ShoppingCartFacade) { }

  ngOnInit() {
  }

  search() {
    if (this.cartFacade.searchText != '') {
      this.shoppingService.getShoppingItems().subscribe((response => {
        if (response) {
          this.shoppingItems = response;
          this.shoppingItems.forEach(element => {
            element.originalPrice = Math.round(((element.price / (100 - element.discount)) * 100));
            element.discountValue = element.originalPrice - element.price;
          });
          var items = this.shoppingItems.filter(item =>
            item.name.toLowerCase().includes(this.cartFacade.searchText.toLowerCase()));
          if (!this.isCartPage) {
            items = this.applyFilter(items);
            this.filterChange.emit(items);
          } else {
            items = this.applyFilter(items);
            this.navigate(items);
          }
        }
      }));
    } else {
      this.shoppingService.getShoppingItems().subscribe((response => {
        if (response) {
          this.shoppingItems = response;
          this.shoppingItems.forEach(element => {
            element.originalPrice = Math.round(((element.price / (100 - element.discount)) * 100));
            element.discountValue = element.originalPrice - element.price;
          });
          if (!this.isCartPage) {
            this.shoppingItems = this.applyFilter(this.shoppingItems);
            this.filterChange.emit(this.shoppingItems);
          } else {
            this.shoppingItems = this.applyFilter(this.shoppingItems);
            this.navigate(this.shoppingItems);
          }
        }
      }));
    }
  }
  applyFilter(items) {
    items.forEach(element => {
      element.originalPrice = Math.round(((element.price / (100 - element.discount)) * 100));
      element.discountValue = element.originalPrice - element.price;
    });
    var filterItems = items.filter(item => item.price >=
      this.cartFacade.value && item.price <= this.cartFacade.highValue);
    return filterItems;
  }

  navigate(items) {
    if (this.isCartPage) {
      this.router.navigate([''], { state: { example: items } })
    }
  }

  showSearch(event) {
    this.displaySearch = !event;
  }
}
