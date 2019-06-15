/**
 *  Represents the Cart Item entity of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Item } from './item.model';

export class CartItem {

    constructor(
        public item: Item,
        public quantity: number,
        public cost: number
    ) { }
}