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
const server = new ApolloServer({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTNDLE1BQU0sUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E0RGhCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixJQUFJLEdBQUcsQ0FBQztBQUVwRSxNQUFNLFNBQVMsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsV0FBVztRQUN4QixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUMvQixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQ0Y7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDekMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDckMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FDRjtDQUNGLENBQUM7QUFNRixNQUFNLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBZTtJQUM1QyxRQUFRO0lBQ1IsU0FBUztDQUNWLENBQUMsQ0FBQztBQUVILE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUFDLE1BQU0sRUFBRTtJQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDYixPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUksT0FBTyxFQUFFO1NBQ3ZCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUMsQ0FBQyJ9