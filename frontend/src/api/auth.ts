import axios from 'axios';
import { ConfirmEmail } from '../dto/confirmEmail';
import { UserLogin } from '../dto/login';
import { ResetPassword } from '../dto/ResetPassword';
import { SignUpResponse } from '../dto/signUpResponse';
import { UpdatePassword } from '../dto/updatePassword';
import { UserEmail } from '../dto/UserEmail';
import { UserSignUp } from './../dto/signup';

const ROOT_URL = 'http://localhost:3000/api/v1/auth';
const USER_ROOT_URL = 'http://localhost:3000/api/v1/users';

interface AuthAPI {
  login: (user: UserLogin) => Promise<string>;
  logout: () =>  Promise<string>;
  signup: (user: UserSignUp) => Promise<SignUpResponse>
  confirmEmail: (user: ConfirmEmail, emailToken: string) => Promise<string>;
  forgotPassword: (email : UserEmail ) => Promise<string>;
  resetPassword: (user: ResetPassword, emailToken :string) => Promise<string>;
  updateMyPassword: (user: UpdatePassword, jwt_token: string) => Promise<string>;
}

const authAPI: AuthAPI = {

  async login(user: UserLogin) {

      try {
        const response = await axios.post(`${ROOT_URL}/login`, user,  {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        return response.data.token;
      }
 catch (error) {
        console.error('Error from backend API:', error);
        return null;
      }
  },
  async signup(user: UserSignUp) {

    try {
      const response = await axios.post(`${ROOT_URL}/signup`, user,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;

    }
 catch (error) {
      console.error('Error from backend API:', error);
      return null;
    }
  },
  async confirmEmail(user: ConfirmEmail, emailToken :string) {

    try {
      const response = await axios.patch(`${ROOT_URL}/confirmEmail/${emailToken}`, user,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data.token;

    }
 catch (error) {
      console.error('Error from backend API:', error);
      return null;
    }
  },
  async logout() {
    try {
      const res = await axios.get(`${ROOT_URL}/logout`,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return res.data.status;
    }
 catch (error) {
      console.error('Logout error :', error);
      return null;
    }
  },
  async forgotPassword(email : UserEmail) {
    try {

      const res = await axios.post(`${ROOT_URL}/forgotPassword`, email,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return res.data.status;
    }
 catch (error) {
      console.error('Reset password error error :', error);
      return null;
    }
  },
  async resetPassword(user: ResetPassword, emailToken :string) {
   
    try {
      const response = await axios.patch(`${ROOT_URL}/resetPassword/${emailToken}`, user,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data.token;

    }
 catch (error) {
      console.error('Error from backend API:', error);
      return null;
    }
  },
  async updateMyPassword(user : UpdatePassword, jwt_token) {
    try {

      const res = await axios.patch(`${USER_ROOT_URL}/updateMyPassword`, user,  {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        }
      });

      return res.data.token;
    }
 catch (error) {
      console.error('Update password error :', error);
      return null;
    }
  },
};

export default authAPI;
