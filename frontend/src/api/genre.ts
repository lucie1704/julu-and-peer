import axios from 'axios';
import { API_URL } from '~/constants';
import { PaginatedCategories } from '~/dto';

const ROOT_URL = `${API_URL}/productgenres`;

interface genreAPI {
  getAllProductGenres: (cancel?: boolean) => Promise<PaginatedCategories>;
}
const controller = new AbortController();

const genreAPI: genreAPI = {
  async getAllProductGenres(cancel: boolean = false) {
    try {
      if (cancel) controller.abort();

      const res = await axios.get(`${ROOT_URL}`);

      return res.data;

    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Error. Fails to get all genres:', error);
      }
      return null;
    }
  },
};

export default genreAPI;
