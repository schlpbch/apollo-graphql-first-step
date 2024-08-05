import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { CartAPI } from './datasources.js';

const typeDefs = `#graphql
  scalar currency

  type Cart {
    id: ID!
    items: [CartItem!]
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
  }

  type Product {
    id: ID!
    name: String!
    price: Price!
  }

  type Price {
    # The amount in cents
    amount: Int 
    # The currency, e.g. USD
    currency: currency!
  }

  input CartInput { 
    id: ID
    items: [CartItemInput!]
  }      

  input CartItemInput {
    id: ID
    product: ProductInput!
    quantity: Int!
  }
  
  input ProductInput {
    id: ID
    name: String!
    price: PriceInput!
  }

  input PriceInput {
    amount: Int
    currency: currency
  }

  type Query {
    goodMorning(name: String!): String  
    getCarts: [Cart!]
    getCart(id: ID!): Cart
  }

  type Mutation {
    deleteCart(id: ID!): Boolean
    addCart(cart: CartInput!): Cart
  }

`;

const goodMorning = async (_, { name }) => `Good morning, ${name}!`;

const resolvers = {
  Query: {
    goodMorning: goodMorning,
    getCarts: (_, __, { cartAPI }) => {
      return cartAPI.getCarts();
    },
    getCart: (_, { id }, { cartAPI }) => {
      return cartAPI.getCart(id);
    },
  },
  Mutation: {
    addCart: (_, { cartInput }, { cartAPI }) => {
      return cartAPI.addCart(cartInput);
    },
    deleteCart: (_, { id }, { cartAPI }) => {
      return cartAPI.deleteCart(id);
    },
  },
};

interface ContextValue {
  cartAPI: CartAPI;
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  async context(_) {
    return {
      cartAPI: new CartAPI(),
    };
  },
});

console.log(`🚀  Server ready at ${url}`);
