import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ShoppingCartFacade } from '../shopping-cart.facade';
import { Router } from '@angular/router';
import { ShoppingService } from '../shopping.service';


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

    constructor(private http: HttpClient, public cartFacade: ShoppingCartFacade, private router: Router,
        private shoppingService:ShoppingService) {
        this.searchData = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.example : [];
    }
    ngOnInit() {
        if (window.screen.width <= 768) {
            this.isMobile = true;
        }
        if (this.searchData.length) {
            this.shoppingItems = this.searchData;
        } else {
            this.shoppingService.getShoppingItems().subscribe((response => {
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
