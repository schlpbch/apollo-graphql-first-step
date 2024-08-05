const { RESTDataSource } = require('apollo-datasource-rest');

class CartAPI extends RESTDataSource {
  constructor() {
    super('http://localhost:3100/carts');
  }

  async willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getCart(_, { id }) {
    console.log('getCart');
    const response = await fetch(`${CART_API_URL}/${id}`);
    const cart = await response.json();
    return cart;
  }

  async getCarts() {
    console.log('getCarts');
    const response = await fetch(CART_API_URL);
    const carts = await response.json();
    return carts;
  }

  async addCart(_, { cart }) {
    console.log('addCart');
    const response = await fetch(CART_API_URL, {
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
  }

  async deleteCart(_, { id }) {
    console.log('deleteCart');
    const response = await fetch(`${CART_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete cart');
    }
    return true;
  }
}


