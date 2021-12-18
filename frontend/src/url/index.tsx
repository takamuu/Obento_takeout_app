/* eslint-disable arrow-body-style */
const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const restaurantsIndexUrl = `${DEFAULT_API_LOCALHOST}/restaurants`;

export const foodsIndexUrl = (restaurantId: string) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;

export const cartsPostUrl = `${DEFAULT_API_LOCALHOST}/carts`;

// todo: ユーザーIDを判定してindexを取得する際に、下記を使用
export const cartsIndexUrl = () => `${DEFAULT_API_LOCALHOST}/carts`;

export const cartsReplaceUrl = `${DEFAULT_API_LOCALHOST}/carts/replace`;

export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
