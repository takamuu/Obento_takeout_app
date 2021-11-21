/* eslint-disable arrow-body-style */
const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const restaurantsIndexUrl = `${DEFAULT_API_LOCALHOST}/restaurants`;
export const foodsIndex = (restaurantId: number) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;
// export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
// export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
// export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
