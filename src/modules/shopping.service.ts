import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ShoppingService {

    constructor(private http: HttpClient) { }

    getShoppingItems() {
        const url = 'https://api.myjson.com/bins/qzuzi';
        var response: any;
        response = this.http.get(url);
        return response;
    }
}
