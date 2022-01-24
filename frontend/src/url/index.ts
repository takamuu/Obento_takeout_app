/* eslint-disable arrow-body-style */
const DEFAULT_API_LOCALHOST = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

export const signInUrl = `${DEFAULT_API_LOCALHOST}/auth/sign_in`;

export const signOutUrl = `${DEFAULT_API_LOCALHOST}/auth/sign_out`;

export const restaurantsIndexUrl = `${DEFAULT_API_LOCALHOST}/restaurants`;

export const foodsIndexUrl = (restaurantId: string) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;

export const cartsPostUrl = `${DEFAULT_API_LOCALHOST}/carts`;

// todo: ユーザーIDを判定してindexを取得する際に、下記を使用
export const cartsIndexUrl = () => `${DEFAULT_API_LOCALHOST}/carts`;

export const cartsReplaceUrl = `${DEFAULT_API_LOCALHOST}/carts/replace`;

export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
