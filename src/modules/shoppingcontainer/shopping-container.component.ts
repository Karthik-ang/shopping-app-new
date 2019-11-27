import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ShoppingCartFacade } from '../shopping-cart.facade';


@Component({
    selector: 'shopping-container',
    templateUrl: './shopping-container.component.html'
})
export class ShoppingContainerComponent implements OnInit {
    title = 'shopping-app';
    // cartItems = [];
    shoppingItems = [];
    isMobile = false;
    totalItems = 0;

    constructor(private http: HttpClient, private cartFacade: ShoppingCartFacade) { }
    ngOnInit() {
        if (window.screen.width <= 768) {
            this.isMobile = true;
        }
        this.getShoppingItems().subscribe((response => {
            if (response) {
                this.shoppingItems = response;
                this.shoppingItems.forEach(element => {
                    element.discountValue = element.price * (element.discount / 100)
                    element.originalPrice = element.price + element.discountValue;
                });
                console.log(response);
            }
        }));
        this.findTotalItems();
        console.log(this.cartFacade.cartItems, 'cartItems')
    }
    getShoppingItems() {
        const url = 'https://api.myjson.com/bins/qzuzi';
        var response: any;
        response = this.http.get(url);
        return response;
    }
    cartChange(item) {
        this.totalItems = 0;
        if (!this.cartFacade.cartItems.length) {
            item.count = 1;
            this.cartFacade.cartItems.push(item);
        } else {
            const index = this.cartFacade.cartItems.findIndex(x => x.id == item.id);
            if (index != -1) {
                this.cartFacade.cartItems[index].count = this.cartFacade.cartItems[index].count + 1;
            } else {
                item.count = 1;
                this.cartFacade.cartItems.push(item);
            }
        }
        this.findTotalItems();
    }
    findTotalItems() {
        var self = this;
        this.cartFacade.cartItems.forEach(el => {
            self.totalItems = self.totalItems + el.count;
        })
    }
    sortingChange(sortedItems) {
        this.shoppingItems = sortedItems;
    }
    filterChange(filterItems) {
        this.shoppingItems = filterItems;
    }
    searchFilter(searchItems) {
        this.shoppingItems = searchItems;
    }
}

