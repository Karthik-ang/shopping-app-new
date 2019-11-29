import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartFacade {
    cartItems = [];
    totalItems = 0;
    searchText = '';
    value: number = 100;
    highValue: number = 10000;
    
    constructor(@Inject(SESSION_STORAGE) public storage: StorageService) {
        const items = JSON.parse(this.storage.get('cartItems'));
        this.cartItems = items ? items : [];
        this.findTotalItems();
    }

    addToCart(item) {
        this.totalItems = 0;
        if (!this.cartItems.length) {
            item.count = 1;
            this.cartItems.push(item);
        } else {
            const index = this.cartItems.findIndex(x => x.id == item.id);
            if (index != -1) {
                this.cartItems[index].count = this.cartItems[index].count + 1;
            } else {
                item.count = 1;
                this.cartItems.push(item);
            }
        }
        this.storage.set('cartItems', JSON.stringify(this.cartItems));
        this.findTotalItems();
    }
    findTotalItems() {
        var self = this;
        this.totalItems = 0;
        this.cartItems.forEach(el => {
            self.totalItems = self.totalItems + el.count;
        })
    }
}
