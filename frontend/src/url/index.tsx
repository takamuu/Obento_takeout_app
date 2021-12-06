/* eslint-disable arrow-body-style */
const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const restaurantsIndexUrl = `${DEFAULT_API_LOCALHOST}/restaurants`;
export const foodsIndexUrl = (restaurantId: string) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;
export const cart = `${DEFAULT_API_LOCALHOST}/cart`;
export const cartReplace = `${DEFAULT_API_LOCALHOST}/cart/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
