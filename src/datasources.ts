import { RESTDataSource } from '@apollo/datasource-rest';

export class CartAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3100/carts';

  constructor() {
    super();
  }

  override willSendRequest(_): void {
    // request.headers.set('Authorization', this.context.token);
    console.log('willSendRequest');
  }

  async getCart(id: string) {
    console.log(`getCart ${id}`);
    return this.get(`carts/${id}`);
  }

  async getCarts() {
    console.log('getCarts');
    return this.get('carts');
  }

  async addCart(cart) {
    console.log('addCart');
    return this.post('carts', cart);
    /*
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });
    if (response.status !== 201) {
      throw new Error('Failed to add cart');
    }
    return await response.json();
    */
  }

  async deleteCart(id: string) {
    console.log('deleteCart');
    return this.delete(`carts/${id}`);
    /*
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: 'DELETE',
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete cart');
    }
    return true;
    */
  }
}
