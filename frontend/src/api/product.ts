import axios from 'axios';
import { ProductI } from '~/dto';

const ROOT_URL = 'http://localhost:3000/api/v1/products';

interface ProductAPI {
  getAllProducts: (jwt_token: string) => Promise<Array<ProductI>>;
  getProductById: (id: string, jwt_token: string) => Promise<ProductI>;
}

const productAPI: ProductAPI = {
  async getAllProducts(jwt_token: string) {
    try {
      const res = await axios.get(`${ROOT_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error. Faills to get all products:', error);
      return null;
    }
  },

  async getProductById(id: string, jwt_token: string) {
    try {
      const res = await axios.get(`${ROOT_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error. Fails to get product :', error);
      return null;
    }
  }
};

export default productAPI;
