import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import {CartAPI} from './datasources.mjs';

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
    getCarts: async (_, __, { dataSources }) => {
      return await dataSources.cartAPI.getCarts();
    },
    getCart: async (_, { id }, { dataSources }) => {
      return await dataSources.cartAPI.getCart(_, { id });
    },
  },
  Mutation: {
    addCart: async (_, { cartInput }, { dataSources }) => {
      return await dataSources.cartAPI.addCart(_, { cartInput });
    },
    deleteCart: async (_, { id }, { dataSources }) => {
      return await dataSources.cartAPI.deleteCart(_, { id });
    },
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: {
    cartAPI: new CartAPI(),
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
