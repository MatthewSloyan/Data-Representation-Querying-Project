import {ProductCart} from './productCart.model';

export interface User {
    firstName: string;
    lastName: string;
    email: number;
    userName: string;
    password: string;
    productsCart :ProductCart[];
}