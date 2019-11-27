import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingContainerComponent } from 'src/modules/shoppingcontainer/shopping-container.component';
import { CartComponent } from 'src/modules/shoppingCart/cart.component';
// import { ShoppingListComponent } from 'src/modules/shoppingCart/shopping-list.component';


const routes: Routes = [
  { path: '', component: ShoppingContainerComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
