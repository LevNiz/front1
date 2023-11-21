import { axiosInstance } from './axios';

// Post GB Franchise:
export const postBusinessRequest = async (data, file) => {
  const sendData = {
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    info: data.info || '',
    archive: false,
  };
  if (file) {
    const milliseconds = new Date().getMilliseconds();
    const formData = new FormData();

    formData.append('image', file);
    formData.append('title', milliseconds);
    try {
      const res = await axiosInstance.post('core/image/', formData);
      console.log(res?.data)
      sendData.file = res?.data?.image;
    } catch (error) {
      return error;
    }
  }
  try {
    const res = await axiosInstance.post('category/businessRequest/', sendData);
    console.log(res?.data)

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
