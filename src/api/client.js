import { request } from './axios';

// Get user's data:
export const fetchUser = async (id) => {
  try {
    const res = await request.get(`user/client/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    throw new Error(error);
  }
};
