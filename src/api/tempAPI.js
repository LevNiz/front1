import { request } from './axios';

// Fetch countries:
export const fetchCountries = async () => {
  try {
    const res = await request.get('category/country/');
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Fetch cities:
export const fetchCities = async () => {
  try {
    const res = await request.get('category/city/');
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
};
