import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    title = 'shopping-app';
    data = [];
    totalPrice = 0;
    isMobile = false;
    totalDiscount = 0;
    // @Input() cartItems = [];
    // @Output() cartChange = new EventEmitter();
    constructor(private router: Router) {
        this.data = this.router.getCurrentNavigation().extras.state.example;
        console.log(this.data, 'data');
    }

    ngOnInit() {
        if (window.screen.width <= 768) {
            this.isMobile = true;
        }
        this.calculateTotal();
        this.calculateDiscount();
    }
    calculateDiscount() {
        this.totalDiscount = 0;
        var self = this;
        this.data.forEach(el => {
            var discountPrice = el.discountValue * el.count;
            self.totalDiscount = self.totalDiscount + discountPrice;
        })
    }
    calculateTotal() {
        this.totalPrice = 0;
        var self = this;
        this.data.forEach(el => {
            var itemPrice = el.price * el.count;
            self.totalPrice = self.totalPrice + itemPrice;
        })
    }
    changeCount(type, item) {
        if (type == 'dec') {
            item.count = item.count - 1;
        } else {
            item.count = item.count + 1;
        }
        this.calculateTotal();
        this.calculateDiscount();
    }
    countChange(event, item) {
        if (event != '') {
            item.count = parseInt(event);
            this.calculateTotal();
            this.calculateDiscount();
        }
    }
    removeCartItem(item) {
        const index = this.data.findIndex(x => x.id == item.id);
        if (index != -1) {
            this.data.splice(index, 1);
            if (this.data.length) {
                this.calculateTotal();
                this.calculateDiscount();
            } else {
                this.router.navigate(['']);
            }
        }
    }
}

