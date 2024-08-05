import { RESTDataSource } from '@apollo/datasource-rest';
export declare class CartAPI extends RESTDataSource {
    baseURL: string;
    constructor();
    willSendRequest(_: any): void;
    getCart(id: string): Promise<any>;
    getCarts(): Promise<any>;
    addCart(cart: any): Promise<any>;
    deleteCart(id: string): Promise<any>;
}
