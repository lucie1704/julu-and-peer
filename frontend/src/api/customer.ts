import axios from 'axios';
import { CustomerI, CustomerUpdateI } from '~/dto/customer';

const ROOT_URL = 'http://localhost:3000/api/v1/customers';

interface CustomerAPI {
  getById: (
    id: string,
    jwt_token: string,
    cancel?: boolean
  ) => Promise<CustomerI>;

  getByUserId: (
    id: string,
    jwt_token: string,
    cancel?: boolean
  ) => Promise<CustomerI>;

  update: (
    id: string,
    customerData: CustomerUpdateI,
    jwt_token: string
  ) => Promise<CustomerI>;

  delete: (
    id: string,
    jwt_token: string
  ) => Promise<void>;
}

const controller = new AbortController();

const customerAPI: CustomerAPI = {

  async getById(id: string, jwt_token: string, cancel: boolean = false) {
    try {
      if (cancel) {
        controller.abort();
      }

      const res = await axios.get(`${ROOT_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Error. Fails to get customer:', error);
      }
      return null;
    }
  },

  async getByUserId(id: string, jwt_token: string, cancel: boolean = false) {
    try {
      if (cancel) {
        controller.abort();
      }

      const res = await axios.get(`${ROOT_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Error. Fails to get customer:', error);
      }
      return null;
    }
  },

  async update(id: string, customerData: CustomerUpdateI, jwt_token: string) {
    try {
      const res = await axios.put(`${ROOT_URL}/${id}`, customerData, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        }
      });

      return res.data;

    } catch (error) {
      console.error('Error. Fails to update customer:', error);
      return null;
    }
  },

  async delete(id: string, jwt_token: string) {
    try {
      await axios.delete(`${ROOT_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error. Fails to delete customer:', error);
    }
  }
};

export default customerAPI;
