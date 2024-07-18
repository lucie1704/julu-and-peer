import axios from 'axios';
import { Product } from '~/dto';

const ROOT_URL = 'http://localhost:3000/api/v1/products';

interface ProductAPI {
  getAllProducts: (jwt_token: string, cancel?: boolean) => Promise<Array<Product>>;
  getProductById: (id: string, jwt_token: string, cancel?: boolean) => Promise<Product>;
}
const controller = new AbortController();

const productAPI: ProductAPI = {

  async getAllProducts(jwt_token: string, cancel:  boolean = false) {

    try {
      if (cancel) {
        controller.abort();
      }

      const res = await axios.get(`${ROOT_URL}`, {
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
        console.error('Error. Fails to get all products:', error);
      }
      return null;
    }
  },

  async getProductById(id: string, jwt_token: string, cancel: boolean = false) {
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
        console.error('Error. Fails to get product:', error);
      }
      return null;
    }
  }
};

export default productAPI;
