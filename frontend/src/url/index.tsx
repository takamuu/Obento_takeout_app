/* eslint-disable arrow-body-style */
const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const restaurantsIndexUrl = `${process.env.REACT_APP_SERVER_URL}/restaurants`;

export const foodsIndexUrl = (restaurantId: string) =>
  `${process.env.REACT_APP_SERVER_URL}/restaurants/${restaurantId}/foods`;

export const cartsPostUrl = `${process.env.REACT_APP_SERVER_URL}/carts`;

// todo: ユーザーIDを判定してindexを取得する際に、下記を使用
export const cartsIndexUrl = () => `${process.env.REACT_APP_SERVER_URL}/carts`;

export const cartsReplaceUrl = `${process.env.REACT_APP_SERVER_URL}/carts/replace`;

export const orders = `${process.env.REACT_APP_SERVER_URL}/orders`;
