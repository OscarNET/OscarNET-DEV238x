/**
 *  Represents the Checkout entity of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
export class Checkout {

    constructor(
        public name: string,
        public address: string,
        public city: string,
        public phoneNumber: string
    ) { }
}