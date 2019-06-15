/**
 *  Provides the mechanism for managing the shopping cart content of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Injectable } from '@angular/core';
import { AzureDataService } from '../services/azure-data.service';
import { CartItem } from '../model/cartItem.model';
import { Item } from '../model/item.model';

@Injectable()
export class CartService {

  private allItems: Item[] = [];
  private cartItems: CartItem[] = [];

  constructor(private dataSource: AzureDataService) {
    this.retrieveAllItems();
  }

  // Adds a given item (product) to the cart.
  addItem(itemNameToAdd: string, quantity: number) {
    if ((itemNameToAdd == null) || (quantity < 1)) {
      return;
    }

    let cartItemIndex: number = this.cartItems.findIndex(x => x.item.name == itemNameToAdd);
    if (cartItemIndex >= 0) {
      let cartItem: CartItem = this.cartItems[cartItemIndex];
      cartItem.cost += cartItem.item.price * quantity;
      cartItem.quantity += quantity;
    }
    else {
      let itemIndex: number = this.allItems.findIndex(x => x.name == itemNameToAdd);
      if (itemIndex >= 0) {
        let item: Item = this.allItems[itemIndex];
        let cartItem: CartItem = new CartItem(
          Object.assign({}, item),
          quantity,
          item.price * quantity);
        this.cartItems.push(cartItem);
      }
      else {
        alert("The Product to add to cart doesn't exist. ProductName: " + itemNameToAdd);
      }
    }
  }

  // Gets the current cart items (products).
  getCartItems(): CartItem[] {
    return Object.assign([], this.cartItems);
  }

  // Removes a given item (product) from the cart.
  removeItem(itemNameToAdd: string) {
    if (itemNameToAdd == null) {
      return;
    }

    let cartItemIndex: number = this.cartItems.findIndex(x => x.item.name == itemNameToAdd);
    if (cartItemIndex >= 0) {
      this.cartItems.splice(cartItemIndex, 1);
    }

  }

  // Retrieves all items (products).
  private retrieveAllItems() {
    this.dataSource.getCategories().subscribe((categories) => {

      if ((categories == null) || (categories.length == 0)) {
        return;
      }

      categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          subcategory.items.forEach(item => { this.allItems.push(item); });
        });
      });

    }, (error) => {
      alert("The Categories couldn't be retrieved from Azure data service. Error: " + error.statusText);
    });
  }

}