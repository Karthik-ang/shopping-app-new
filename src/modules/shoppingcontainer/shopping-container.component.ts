import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ShoppingCartFacade } from '../shopping-cart.facade';
import { Router } from '@angular/router';


@Component({
    selector: 'shopping-container',
    templateUrl: './shopping-container.component.html'
})
export class ShoppingContainerComponent implements OnInit {
    title = 'shopping-app';
    // cartItems = [];
    shoppingItems = [];
    isMobile = false;
    searchData = [];
    isCartPage = false;

    constructor(private http: HttpClient, public cartFacade: ShoppingCartFacade, private router: Router) {
        this.searchData = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.example : [];
    }
    ngOnInit() {
        if (window.screen.width <= 768) {
            this.isMobile = true;
        }
        if (this.searchData.length) {
            this.shoppingItems = this.searchData;
        } else {
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
        }
        this.cartFacade.findTotalItems();
    }
    getShoppingItems() {
        const url = 'https://api.myjson.com/bins/qzuzi';
        var response: any;
        response = this.http.get(url);
        return response;
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
    cartChange(item) {
        this.cartFacade.addToCart(item);
    }
}

