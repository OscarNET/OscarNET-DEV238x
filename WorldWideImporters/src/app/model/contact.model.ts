/**
 *  Represents the Contact entity of the online store.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
export class Contact {

    constructor(
        public name: string,
        public email: string,
        public subject: string,
        public message: string
    ) { }
}