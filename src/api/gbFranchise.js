import { axiosInstance } from './axios';

// Post GB Franchise:
export const postFranchise = async (data) => {
  const sendData = {
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    archive: false,
  };
  try {
    await axiosInstance.post('category/franchise/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false, data: error };
  }
};
