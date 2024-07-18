import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import authAPI from '~/api/auth';
import {
  ConfirmEmail,
  ResetPassword,
  SignUp,
  UpdatePassword,
  UserEmail,
  UserLogin,
  UserRole
} from '~/dto';
import router from '~/router/router';

export const useAuth = defineStore('auth', () => {
  const jwtToken = ref<string | null>(window.localStorage.getItem('jwt_token'));
  const roles = ref<string | null>(window.localStorage.getItem('roles'));
  const status = ref<string | null>();
  const username = ref<string | null>();
  const message = ref<string | null>();

  const isAuthenticated = computed(() => !!jwtToken.value);
  const isStatus = computed(() => !!status.value);

  const login = async (user: UserLogin) => {
    const token = await authAPI.login(user);
    if (token) {
      jwtToken.value = token;
        window.localStorage.setItem('jwt_token', token);
      router.push('/');
    } else {
      console.log('Invalid jwt_token');
    }
  };

  const signup = async (user: SignUp) => {
    const response = await authAPI.signup(user);
    if (response) {
      message.value = 'Nous t \' avons envoyé un email pour valider ton compte.';
      router.push('/confirmModal');
    } else {
      console.log('Invalid signup status');
    }
  };

  const confirmEmail = async (payload: {
    user: ConfirmEmail;
    emailToken: string;
  }) => {
    const token = await authAPI.confirmEmail(payload.user, payload.emailToken);
    if (token) {
      jwtToken.value = token;
      message.value = 'Your account has been successfully created !.';
      window.localStorage.setItem('jwt_token', token);
      router.push('/');
    } else {
      console.log('Invalid jwt_token');
    }
  };

  const logout = async () => {
    const newStatus = await authAPI.logout();
    if (newStatus) {
      jwtToken.value = null;
      window.localStorage.removeItem('jwt_token');
      router.push('/');
    } else {
      console.log('Invalid logout status');
    }
  };

  const forgotPassword = async (email: UserEmail) => {
    const newStatus = await authAPI.forgotPassword(email);
    if (newStatus) {
      status.value = newStatus;
      message.value
        = 'A mail was sent to your Email. Click the link to reset your password.';
      router.push('/confirmModal');
    } else {
      console.log('Invalid forgot password status');
    }
  };

  const resetPassword = async (payload: {
    user: ResetPassword;
    emailToken: string;
  }) => {
    const token = await authAPI.resetPassword(payload.user, payload.emailToken);
    if (token) {
      jwtToken.value = token;
      message.value
        = 'Welcome back! Your password has been successfully reset.';
      window.localStorage.setItem('jwt_token', token);
      router.push('/confirmModal');
    } else {
      console.log('Invalid jwt_token');
    }
  };

  const updateMyPassword = async (user: UpdatePassword) => {
    const currentJwtToken = jwtToken.value;
    if (!currentJwtToken) {
      message.value
        = 'Fail: You\'re not logged in. Please log in before updating your password !.';
      router.push('/confirmModal');
    } else {
      const token = await authAPI.updateMyPassword(user, currentJwtToken);
      if (token) {
        jwtToken.value = token;
        message.value = 'Password updated successfully !.';
        window.localStorage.setItem('jwt_token', token);
        router.push('/confirmModal');
      } else {
        console.log('Invalid jwt_token');
      }
    }
  };

  const hasRole = (userRole: UserRole) =>
    roles.value && roles.value.includes(userRole);

  return {
    jwtToken,
    username,
    message,
    isAuthenticated,
    isStatus,
    login,
    logout,
    signup,
    confirmEmail,
    forgotPassword,
    resetPassword,
    updateMyPassword,
    hasRole
  };
});
