//@ts-ignore
import { ActionTree, Commit, GetterTree, Module, MutationTree } from 'vuex';
import authAPI from '../../api/auth';
import { ConfirmEmail } from '../../dto/confirmEmail';
import { UserLogin } from '../../dto/login';
import { ResetPassword } from '../../dto/ResetPassword';
import { UserSignUp } from '../../dto/signUp';
import { UpdatePassword } from '../../dto/updatePassword';
import { UserEmail } from '../../dto/UserEmail';
// import router from '../../routes/router';

interface State {
  jwt_token: string | null;
  status: string| null;
  userName: string| null;
  message: string | null;
}

const state: State = {
  jwt_token: window.localStorage.getItem('jwt_token'),
  status: null,
  userName: '',
  message: ''
};

const getters: GetterTree<State, any> = {
  isLoggedIn: (state: State) => !!state.jwt_token,
  isStatus: (state: State) => !!state.status,
  getUserName: (state: State) => state.userName,
  getMessage :(state: State) => state.message,
  getJwtToken : (state: State) => state.jwt_token
};

const actions: ActionTree<State, any> = {

  async login({ commit }: { commit: Commit<State> }, user: UserLogin) {
    const jwt_token = await authAPI.login(user);

    if (jwt_token) {
      commit('setJwtToken', jwt_token);
      window.localStorage.setItem('jwt_token', jwt_token);
      
      router.push('/');
    }
 else {
      console.log('Invalide jwt_token');
    }

  },
  async signup({ commit }: { commit: Commit<State> }, user: UserSignUp) {

    const data = await authAPI.signup(user);

    if (data.status) {
      commit('setSignUpStatus', data.status);
      commit('setUserName', data.data.user);
      commit('setMessage', 'A mail was sent to your Email. Click to the link to validate your account.');

      router.push('/confirmModal');
    }
 else {
      console.log('Invalide signup status');
    }

  },
  async confirmEmail({ commit }: { commit: Commit<State> }, payload : {user: ConfirmEmail, emailToken : string}) {

    const jwt_token = await authAPI.confirmEmail(payload.user, payload.emailToken);

    if (jwt_token) {
      commit('setJwtToken', jwt_token);
      commit('setMessage', 'Your account has been successfully created !.');

      window.localStorage.setItem('jwt_token', jwt_token);
      
      router.push('/');
    }
 else {
      console.log('Invalide jwt_token');
    }

  },
  async logout({ commit }: { commit: Commit<State> }) {
    const status = await authAPI.logout();
    
    if (status) {
      commit('setJwtToken', null);
      window.localStorage.removeItem('jwt_token');

      router.push('/');
    }
 else {
      console.log('Invalide signup status');
    }
  },
  async forgotPassword({ commit }: { commit: Commit<State> }, email: UserEmail) {

    const status = await authAPI.forgotPassword(email);

    if (status) {
      commit('setStatus', status);
      commit('setMessage', 'A mail was sent to your Email. Click the link to reset your password.');

      router.push('/confirmModal');
    }
 else {
      console.log('Invalide signup status');
    }

  },
  async resetPassword({ commit }: { commit: Commit<State> }, payload : {user: ResetPassword, emailToken : string}) {

    const jwt_token = await authAPI.resetPassword(payload.user, payload.emailToken);

    if (jwt_token) {
      commit('setJwtToken', jwt_token);
      commit('setMessage', 'Welcome back! Your password has been successfully reset.');

      window.localStorage.setItem('jwt_token', jwt_token);
      
      router.push('/confirmModal');
    }
 else {
      console.log('Invalide jwt_token');
    }

  },
  async updateMyPassword({ commit }: { commit: Commit<State> }, user: UpdatePassword) {

    const currentJwtToken = state.jwt_token;

    if (!currentJwtToken) {
      commit('setMessage', 'Fail: You\'re not login. Please. Login before update your password !.');

      router.push('/confirmModal');
    }
 else {
      
      const jwt_token = await authAPI.updateMyPassword(user, currentJwtToken);
      
      if (jwt_token) {
        commit('setJwtToken', jwt_token);
        commit('setMessage', 'Password updated successfully !.');

        window.localStorage.setItem('jwt_token', jwt_token);
        
        router.push('/confirmModal');
      }
 else {
        console.log('Invalide jwt_token');
      }
    }

  },
};

const mutations: MutationTree<State> = {
  setJwtToken: (state : State, jwt_token: string) => {
    state.jwt_token = jwt_token;
  },
  setStatus : (state : State, signUpStatus: string) => {
    state.status = signUpStatus;
  },
  setUserName : (state : State, userName: string) => {
    state.userName = userName;
  },
  setMessage: (state : State, message: string) => {
    state.message = message;
  }
  
};

const auth: Module<State, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default auth;
