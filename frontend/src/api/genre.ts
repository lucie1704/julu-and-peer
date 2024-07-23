import axios from 'axios';
import { API_URL } from '~/constants';
import { PaginatedCategories } from '~/dto';
import { headers } from '~/utils/headers';

const ROOT_URL = `${API_URL}/productgenres`;

interface genreAPI {
  getAllProductGenres: (cancel?: boolean) => Promise<PaginatedCategories>;
}
const controller = new AbortController();

const genreAPI: genreAPI = {
  async getAllProductGenres(cancel: boolean = false) {
    try {
      if (cancel) controller.abort();

      const res = await axios.get(`${ROOT_URL}`, {
        headers: headers()
      });

      return res.data;

    } catch (error) {
      return null;
    }
  },
};

export default genreAPI;
