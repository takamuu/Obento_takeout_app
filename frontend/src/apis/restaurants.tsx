import axios from 'axios';

import { restaurantsIndexUrl } from 'url/index';

type RestaurantType = {
  id: number;
  name: string;
  description: string;
  fee: number;
  postal_code: number;
  prefecture_code: string;
  prefecture: string;
  city: string;
  block_building: string;
  phone_number: string;
  update_time: any;
  image: string;
  created_at: any;
  updated_at: any;
};

export const fetchRestaurants = () => {
  return axios
    .get<Array<RestaurantType>>(restaurantsIndexUrl)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });
};
