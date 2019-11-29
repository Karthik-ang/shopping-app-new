import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartFacade } from '../shopping-cart.facade';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    title = 'shopping-app';
    totalPrice = 0;
    isMobile = false;
    totalDiscount = 0;
    isCartPage = true;
    // @Input() cartItems = [];
    // @Output() cartChange = new EventEmitter();
    constructor(private router: Router, public cartFacade: ShoppingCartFacade) {
    }

    ngOnInit() {
        const items = JSON.parse(window.localStorage.getItem('cartItems'));
        this.cartFacade.cartItems = items ? items : [];
        if (!this.cartFacade.cartItems.length) {
            this.router.navigate(['']);
        } else {
            this.cartFacade.findTotalItems();
        }
        if (window.screen.width <= 768) {
            this.isMobile = true;
        }
        this.calculateTotal();
        this.calculateDiscount();
    }
    calculateDiscount() {
        this.totalDiscount = 0;
        var self = this;
        this.cartFacade.cartItems.forEach(el => {
            var discountPrice = el.discountValue * el.count;
            self.totalDiscount = self.totalDiscount + discountPrice;
        })
    }
    calculateTotal() {
        this.totalPrice = 0;
        var self = this;
        this.cartFacade.cartItems.forEach(el => {
            var itemPrice = el.price * el.count;
            self.totalPrice = self.totalPrice + itemPrice;
        });
    }
    changeCount(type, item) {
        if (type == 'dec') {
            item.count = item.count - 1;
            if (item.count == 0) {
                this.removeCartItem(item);
            }

        } else {
            item.count = item.count + 1;
        }
        window.localStorage.setItem('cartItems', JSON.stringify(this.cartFacade.cartItems));
        this.calculateTotal();
        this.calculateDiscount();
        this.cartFacade.findTotalItems();
    }
    countChange(event, item) {
        if (event != '') {
            item.count = parseInt(event);
            this.calculateTotal();
            this.calculateDiscount();
            this.cartFacade.findTotalItems();
        }
    }
    removeCartItem(item) {
        const index = this.cartFacade.cartItems.findIndex(x => x.id == item.id);
        if (index != -1) {
            this.cartFacade.cartItems.splice(index, 1);
            if (this.cartFacade.cartItems.length) {
                this.calculateTotal();
                this.calculateDiscount();
                this.cartFacade.findTotalItems();
            } else {
                this.router.navigate(['']);
            }
        }
    }
}

