import axios from 'axios';
import { API_URL } from '~/constants';
import { Customer, CustomerUpdateI } from '~/dto/customer';
import { headers } from '~/utils/headers';

const ROOT_URL = `${API_URL}/customers`;

interface CustomerAPI {
  getById: (
    id: string,
    cancel?: boolean
  ) => Promise<Customer>;

  getByUserId: (
    id: string,
    cancel?: boolean
  ) => Promise<Customer>;

  update: (
    id: string,
    customerData: CustomerUpdateI,
  ) => Promise<Customer>;

  delete: ( id: string,) => Promise<void>;
}

const controller = new AbortController();

const customerAPI: CustomerAPI = {

  async getById(id: string, cancel: boolean = false) {
    try {
      if (cancel) {
        controller.abort();
      }

      const res = await axios.get(`${ROOT_URL}/${id}`, {
        headers: headers(),
        signal: controller.signal
      });

      return res.data;
    } catch (error) {
      return null;
    }
  },

  async getByUserId(id: string, cancel: boolean = false) {
    try {
      if (cancel) {
        controller.abort();
      }

      const res = await axios.get(`${ROOT_URL}/user/${id}`, {
        headers: headers(),
        signal: controller.signal
      });

      return res.data;
    } catch (error) {
      return null;
    }
  },

  async update(id: string, customerData: CustomerUpdateI) {
    try {
      const res = await axios.put(`${ROOT_URL}/${id}`, customerData, {
        headers: headers()
      });

      return res.data;

    } catch (error) {
      return null;
    }
  },

  async delete(id: string) {
      return await axios.delete(`${ROOT_URL}/${id}`, {
        headers: headers()
      });
  }
};

export default customerAPI;
