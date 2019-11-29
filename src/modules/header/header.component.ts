import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'header-comp',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    @Input() cartItems = [];
    @Input() isMobile = false;
    @Input() totalItems = 0;
    @Input() shoppingItems = [];
    @Output() filterChange = new EventEmitter();
    @Input() isCartPage = false;
    showCart = true;

    constructor(private router: Router) { }

    ngOnInit() {
        if (window.location.pathname == '/cart') {
            this.showCart = false;
        }
    }
    searchFilter(items) {
        this.filterChange.emit(items);
    }

    navigate() {
        const data = this.cartItems;
        this.router.navigate(['/cart']);
    }
}

