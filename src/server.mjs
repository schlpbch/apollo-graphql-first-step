import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

const CART_API_URL = 'http://localhost:3100/carts';

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
    getCarts: [Cart]
    getCart(id: ID!): Cart
  }

  type Mutation {
    deleteCart(id: ID!): Boolean
    addCart(cart: CartInput!): Cart
  }

`;

const goodMorning = async (_, { name }) => `Good morning, ${name}!`;
const getCart = async (_, { id }) => {
  console.log('getCart');
  const response = await fetch(`${CART_API_URL}/${id}`);
  const cart = await response.json();
  return cart;
};

const getCarts = async () => {
  console.log('getCarts');
  const response = await fetch(CART_API_URL);
  const carts = await response.json();
  return carts;
};

const addCart = async (_, { cart }) => {
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
};

const deleteCart = async (_, { id }) => {
  console.log('deleteCart');
  const response = await fetch(`${CART_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (response.status !== 200) {
    throw new Error('Failed to delete cart');
  }
  return true;
};

const resolvers = {
  Query: {
    goodMorning: goodMorning,
    getCarts: getCarts,
    getCart: getCart,
  },
  Mutation: {
    addCart: addCart,
    deleteCart: deleteCart,
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
