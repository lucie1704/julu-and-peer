import axios from 'axios';
import { API_URL } from '~/constants';
import { PaginatedProducts, Product } from '~/dto';
import { headers } from '~/utils/headers';

const ROOT_URL = `${API_URL}/products`;

interface ProductAPI {
  getAllProducts: (query?: string, cancel?: boolean) => Promise<PaginatedProducts>;
  getProductById: (id: string, cancel?: boolean) => Promise<Product>;
}
const controller = new AbortController();

const productAPI: ProductAPI = {
  async getAllProducts(query?: string, cancel: boolean = false) {
    try {
      if (cancel) controller.abort();

      if (query) {
        const res = await axios.get(`${ROOT_URL}${query}`, {
          headers: headers(),
          signal: controller.signal
        });
        return res.data;
      } else {
        const res = await axios.get(`${ROOT_URL}`, {
          headers: headers(),
          signal: controller.signal
        });
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },

  async getProductById(id: string, cancel: boolean = false) {
    try {
      if (cancel) controller.abort();

      const res = await axios.get(`${ROOT_URL}/${id}`, {
        headers: headers(),
        signal: controller.signal
      });

      return res.data;

    } catch (error) {
      return null;
    }
  }
};

export default productAPI;
