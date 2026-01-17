import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_URL, SHOPIFY_HEADERS } from '../config/shopify';
import { Product, CartItem, CustomerInfo } from '../types';

const client = new GraphQLClient(GRAPHQL_URL, {
  headers: SHOPIFY_HEADERS,
});

const PRODUCTS_QUERY = `
  query getProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          productType
          tags
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          image {
            url
          }
        }
      }
    }
  }
`;

const CHECKOUT_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const shopifyService = {
  async fetchProducts(category?: string): Promise<Product[]> {
    try {
      const query = category 
        ? `product_type:${category} OR tag:${category}`
        : undefined;
      
      const data: any = await client.request(PRODUCTS_QUERY, { 
        first: 50,
        query,
      });
      
      return data.products.edges.map((edge: any) => {
        const node = edge.node;
        const imageEdge = node.images.edges[0];
        
        return {
          id: node.id,
          title: node.title,
          description: node.description || '',
          price: node.priceRange.minVariantPrice.amount,
          imageURL: imageEdge?.node?.url || null,
          category: node.productType,
          tags: node.tags,
          variants: node.variants.edges.map((v: any) => ({
            id: v.node.id,
            title: v.node.title,
            price: v.node.price.amount,
          })),
        };
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async fetchCategories(): Promise<string[]> {
    try {
      const data: any = await client.request(COLLECTIONS_QUERY, { first: 20 });
      return data.collections.edges.map((edge: any) => edge.node.title);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return default categories if API fails
      return ['Pizza', 'Pasta', 'Wings', 'Sides', 'Drinks'];
    }
  },

  async createCheckout(items: CartItem[], customerInfo: CustomerInfo): Promise<string> {
    try {
      const lineItems = items.map(item => ({
        variantId: item.variant.id,
        quantity: item.quantity,
      }));

      const variables = {
        input: {
          lineItems,
          email: customerInfo.email,
          shippingAddress: {
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            address1: customerInfo.address.street,
            city: customerInfo.address.city,
            province: customerInfo.address.state,
            zip: customerInfo.address.zipCode,
            country: 'US',
          },
        },
      };

      const data: any = await client.request(CHECKOUT_MUTATION, variables);
      
      if (data.checkoutCreate.checkoutUserErrors.length > 0) {
        throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
      }

      return data.checkoutCreate.checkout.webUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  },
};
