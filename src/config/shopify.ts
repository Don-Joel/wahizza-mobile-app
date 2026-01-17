export const SHOPIFY_CONFIG = {
  shopURL: process.env.EXPO_PUBLIC_SHOPIFY_SHOP_URL || 'YOUR_SHOP.myshopify.com',
  storefrontAccessToken: process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || 'YOUR_STOREFRONT_ACCESS_TOKEN',
  apiVersion: '2024-01',
};

export const GRAPHQL_URL = `https://${SHOPIFY_CONFIG.shopURL}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

export const SHOPIFY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
};
