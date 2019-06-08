/**
 *  Represents the Item entity of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
export interface Item {
    name: string;
    description: string;
    price: number;
    imagelink: string;
    rating: string;
    stock: string;
    category: string;
    subcategory: string;
}