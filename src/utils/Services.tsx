import axios from 'axios';

interface AxiosConfigData {
  method: string,
  endpoint: string,
  data?: any
}

const baseURL = 'https://notes-api-int.cyclic.app/api';
const timeout = 10000;

const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};

const apiCall = async ({ method, endpoint, data }: AxiosConfigData): Promise<any> => {
  try {
    let response;
    switch (method.toLowerCase()) {
      case 'get':
        response = await axiosInstance.get(endpoint);
        break;
      case 'post':
        response = await axiosInstance.post(endpoint, data);
        break;
      case 'put':
        response = await axiosInstance.put(endpoint, data);
        break;
      case 'delete':
        response = await axiosInstance.delete(endpoint);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default apiCall;
