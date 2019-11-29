import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

import { HttpClient } from '@angular/common/http';
import { ShoppingService } from '../shopping.service';

declare var $: any;

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
    title = 'shopping-app';
    value: number = 100;
    highValue: number = 10000;
    options: Options = {
        floor: 100,
        ceil: 10000
    };

    @Input() shoppingItems = [];
    @Output() filterChange = new EventEmitter();
    @Input() isMobile = false;

    constructor(private http: HttpClient, private shoppingService: ShoppingService) { }

    ngOnInit() {

    }
    applyFilter(value, highValue) {
        this.shoppingService.getShoppingItems().subscribe((response => {
            if (response) {
                this.shoppingItems = response;
                this.shoppingItems.forEach(element => {
                    element.discountValue = element.price * (element.discount / 100)
                    element.originalPrice = element.price + element.discountValue;
                });
                const items = this.shoppingItems.filter(item => item.price >= value && item.price <= highValue);
                this.filterChange.emit(items);
            }
        }));
        if (this.isMobile) {
            this.close();
        }
    }
    showPopup() {
        $('#myFilterModal').show();
    }
    close() {
        $('#myFilterModal').hide();
    }
}

