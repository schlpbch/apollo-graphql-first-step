export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  currency: { input: any; output: any; }
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<CartItem>>;
};

export type CartInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  items?: InputMaybe<Array<CartItemInput>>;
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  product: ProductInput;
  quantity: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCart?: Maybe<Cart>;
  deleteCart?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddCartArgs = {
  cart: CartInput;
};


export type MutationDeleteCartArgs = {
  id: Scalars['ID']['input'];
};

export type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Int']['output']>;
  currency: Scalars['currency']['output'];
};

export type PriceInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['currency']['input']>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Price;
};

export type ProductInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  price: PriceInput;
};

export type Query = {
  __typename?: 'Query';
  getCart?: Maybe<Cart>;
  getCarts?: Maybe<Array<Cart>>;
  goodMorning?: Maybe<Scalars['String']['output']>;
};


export type QueryGetCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGoodMorningArgs = {
  name: Scalars['String']['input'];
};
