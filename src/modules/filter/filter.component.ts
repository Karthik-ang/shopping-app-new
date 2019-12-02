import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

import { ShoppingService } from '../shopping.service';
import { ShoppingCartFacade } from '../shopping-cart.facade';

declare var $: any;

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
    title = 'shopping-app';

    options: Options = {
        floor: 100,
        ceil: 10000
    };

    @Input() shoppingItems = [];
    @Output() filterChange = new EventEmitter();
    @Input() isMobile = false;

    constructor(private shoppingService: ShoppingService, public cartFacade: ShoppingCartFacade) { }

    ngOnInit() {

    }
    applyFilter(value, highValue) {
        this.shoppingService.getShoppingItems().subscribe((response => {
            if (response) {
                this.shoppingItems = response;
                this.shoppingItems.forEach(element => {
                    element.originalPrice = Math.round(((element.price / (100 - element.discount)) * 100));
                    element.discountValue = element.originalPrice - element.price;
                });
                var items = this.shoppingItems.filter(item => item.price >= value && item.price <= highValue);
                if (this.cartFacade.searchText != '') {
                    items = this.search(items);
                }
                this.filterChange.emit(items);
            }
        }));
        if (this.isMobile) {
            this.close();
        }
    }
    search(items) {
        if (this.cartFacade.searchText != '') {
            items.forEach(element => {
                element.originalPrice = Math.round(((element.price / (100 - element.discount)) * 100));
                element.discountValue = element.originalPrice - element.price;
            });
            const searchItems = items.filter(item => item.name.toLowerCase().includes(this.cartFacade.searchText.toLowerCase()));
            return searchItems;
        }
    }

    showPopup() {
        $('#myFilterModal').show();
    }
    close() {
        $('#myFilterModal').hide();
    }
}
