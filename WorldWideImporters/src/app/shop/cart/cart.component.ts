/**
 *  Represents the Cart component for displaying the cart's content.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cartItem.model';
import { Checkout } from '../../model/checkout.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  checkoutModel: Checkout = new Checkout('', '', '', '');
  cartItems: CartItem[];
  subtotal: number = 0;
  total: number = 0;
  tax: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateAmounts();
  }

  // Removes a given item (product) from the cart.
  // rubric54 : The remove button should remove an item from the shopping cart.
  removeItem(itemNameToAdd: string) {
    this.cartService.removeItem(itemNameToAdd);
    this.cartItems = this.cartService.getCartItems();
    this.calculateAmounts();
  }

  // Calculates the amounts (cart summary).
  // rubric53 : The cost details section should update if any item are removed from the shopping cart
  //            or if any of the item quantities are updated.
  private calculateAmounts() {
    this.subtotal = 0;
    this.cartItems.forEach(cartItem => {
      this.subtotal += cartItem.cost;
    });
    this.tax = this.subtotal * .1;
    this.total = this.subtotal + this.tax;
  }

}
