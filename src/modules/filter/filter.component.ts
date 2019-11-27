import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
    title = 'shopping-app';
    value: number = 100;
    options: Options = {
        floor: 100,
        ceil: 10000
    };

    @Input() shoppingItems = [];
    @Output() filterChange = new EventEmitter();
    @Input() isMobile = false;

    constructor(private http: HttpClient) { }

    ngOnInit() {

    }
    getShoppingItems() {
        const url = 'https://api.myjson.com/bins/qzuzi';
        var response: any;
        response = this.http.get(url);
        return response;
    }
    applyFilter(value) {
        this.getShoppingItems().subscribe((response => {
            if (response) {
                this.shoppingItems = response;
                this.shoppingItems.forEach(element => {
                    element.discountValue = element.price * (element.discount / 100)
                    element.originalPrice = element.price + element.discountValue;
                });
                const items = this.shoppingItems.filter(item => item.price > value);
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

