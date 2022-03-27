/* eslint-disable arrow-body-style */
const DEFAULT_API_LOCALHOST = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

export const signInUrl = `${DEFAULT_API_LOCALHOST}/auth/sign_in`;

export const signOutUrl = `${DEFAULT_API_LOCALHOST}/auth/sign_out`;

export const signUpUrl = `${DEFAULT_API_LOCALHOST}/auth`;

export const restaurantsIndexUrl = `${DEFAULT_API_LOCALHOST}/restaurants`;

export const foodsIndexUrl = (restaurantId: string) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;

export const cartsUrl = `${DEFAULT_API_LOCALHOST}/carts`;

export const cartDetailsDeleteUrl = (foodId: string) =>
  `${DEFAULT_API_LOCALHOST}/cart_details/${foodId}`;

export const cartsReplaceUrl = `${DEFAULT_API_LOCALHOST}/cart_details/replace`;

export const orders = `${DEFAULT_API_LOCALHOST}/orders`;

export const guestSignInUrl = `${DEFAULT_API_LOCALHOST}/auth/guest_sign_in`;
