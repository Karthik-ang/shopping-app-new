import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartFacade {
    cartItems = [];
    constructor() { }
}