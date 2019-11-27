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

    constructor(private router: Router) { }

    ngOnInit() {

    }
    searchFilter(items) {
        this.filterChange.emit(items);
    }
    
    navigate() {
        const data = this.cartItems;
        this.router.navigate(['/cart'], { state: { example: data } });
    }
}

