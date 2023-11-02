import { request } from './axios';

// Costs:
export const fetchCosts = async () => {
  try {
    const res = await request.get('category/costs/');
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};
