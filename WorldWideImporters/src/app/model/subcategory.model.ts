/**
 *  Represents the Subcategory entity of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Item } from './item.model';

export interface Subcategory {
    name: string;
    items: Item[];
}