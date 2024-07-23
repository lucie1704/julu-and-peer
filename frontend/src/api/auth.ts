import axios from 'axios';
import { API_URL } from '~/constants';
import {
  ConfirmEmail,
  ResetPassword,
  SignUp,
  UpdatePassword,
  UserEmail,
  UserLogin
} from '~/dto';
import { headers } from '~/utils/headers';

const ROOT_URL = `${API_URL}/auth`;
const USER_ROOT_URL = `${API_URL}/users`;

interface AuthAPI {
  login: (user: UserLogin) => Promise<string>;
  logout: () => Promise<void>;
  signup: (user: SignUp) => Promise<boolean>;
  confirmEmail: (user: ConfirmEmail, emailToken: string) => Promise<string>;
  forgotPassword: (email: UserEmail) => Promise<string>;
  resetPassword: (user: ResetPassword, emailToken: string) => Promise<string>;
  updateMyPassword: (
    user: UpdatePassword,
    jwt_token: string
  ) => Promise<string>;
}

const authAPI: AuthAPI = {
  async login(user: UserLogin) {
    try {
      const response = await axios.post(`${ROOT_URL}/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async signup(user: SignUp) {
    try {
        await axios.post(`${ROOT_URL}/signup`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  async confirmEmail(user: ConfirmEmail, emailToken: string) {
    try {
      const response = await axios.patch(
        `${ROOT_URL}/confirmEmail/${emailToken}`,
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async logout() {
    await axios.get(`${ROOT_URL}/logout`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
  },

  async forgotPassword(email: UserEmail) {
    try {
      const res = await axios.post(`${ROOT_URL}/forgotPassword`, email, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async resetPassword(user: ResetPassword, emailToken: string) {
    try {
      const response = await axios.patch(
        `${ROOT_URL}/resetPassword/${emailToken}`,
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async updateMyPassword(user: UpdatePassword) {
    try {
      const res = await axios.patch(`${USER_ROOT_URL}/updateMyPassword`, user, {
        headers: headers()
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }
};

export default authAPI;
