/**
 *  Represents the Category entity of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Subcategory } from './subcategory.model';

export interface Category {
    category: string;
    subcategories: Subcategory[];
}