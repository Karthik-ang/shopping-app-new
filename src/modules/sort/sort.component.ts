import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'sort',
    templateUrl: './sort.component.html',
})
export class SortComponent implements OnInit {
    title = 'shopping-app';
    @Input() shoppingItems = [];
    @Output() sortingChange = new EventEmitter();
    @Input() isMobile = false;
    selected = '';
    sortValue='';
    
    ngOnInit() {
    }

    sort(value) {
        if (value == 'LH') {
            // Low to High
            this.sortValue = value;
            const sorted = this.shoppingItems.sort(function (a, b) { return a.price - b.price });
            this.sortingChange.emit(sorted);
        } else if (value == 'HL') {
            // High to Low
            this.sortValue = value;
            const sorted = this.shoppingItems.sort(function (a, b) { return b.price - a.price });
            this.sortingChange.emit(sorted);
        } else {
            // Discount
            this.sortValue = value;
            const sorted = this.shoppingItems.sort(function (a, b) { return a.discount - b.discount });
            this.sortingChange.emit(sorted);
        }
        if (this.isMobile) {
            this.close();
        }
    }
    showPopup() {
        $('#mySortModal').show();
    }
    close() {
        $('#mySortModal').hide();
    }
}

