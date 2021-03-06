import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from '../modules/shoppingCart/shopping-list.component';
import { ShoppingContainerComponent } from 'src/modules/shoppingcontainer/shopping-container.component';
import { CartComponent } from 'src/modules/shoppingCart/cart.component';
import { SortComponent } from 'src/modules/sort/sort.component';
import { FilterComponent } from 'src/modules/filter/filter.component';
import { SearchComponent } from 'src/modules/search/search.component';
import { HeaderComponent } from 'src/modules/header/header.component';
import { ShoppingCartFacade } from 'src/modules/shopping-cart.facade';
import { ShoppingService } from 'src/modules/shopping.service';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingContainerComponent,
    CartComponent,
    SortComponent,
    FilterComponent,
    SearchComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng5SliderModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [ShoppingCartFacade, ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
