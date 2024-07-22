import { jwtDecode } from "jwt-decode";
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

interface JwtPayload {
  id: string;
  role: string;
}

export const useAuth = defineStore('auth', () => {
  const jwtToken = ref<string | null>(window.localStorage.getItem('jwt_token'));
  const roles = ref<string | null>(window.localStorage.getItem('roles'));
  const status = ref<string | null>(null);
  const message = ref<string | null>(null);

  const isAuthenticated = computed(() => !!jwtToken.value);
  const isStatus = computed(() => !!status.value);

  const decodeAndStoreToken = (token: string) => {
    jwtToken.value = token;
    window.localStorage.setItem('jwt_token', token);

    const decoded = jwtDecode<JwtPayload>(token);

    window.localStorage.setItem('roles', decoded.role);
  };

  const login = async (user: UserLogin) => {
    try {
      const token = await authAPI.login(user);
      if (token) {
        decodeAndStoreToken(token);
        router.push('/');
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (error) {
      message.value = 'Login failed: Invalid username or password.';
    }
  };

  const signup = async (user: SignUp) => {
    try {
      const response = await authAPI.signup(user);
      if (response) {
        message.value = 'Nous vous avons envoyé un email pour valider votre compte.';
        router.push('/confirmModal');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      message.value = 'Signup failed: Unable to create account.';
    }
  };

  const confirmEmail = async (payload: { user: ConfirmEmail; emailToken: string; }) => {
    try {
      const token = await authAPI.confirmEmail(payload.user, payload.emailToken);
      if (token) {
        decodeAndStoreToken(token);
        message.value = 'Votre compte a été créé avec succès !';
        router.push('/');
      } else {
        throw new Error('Email confirmation failed');
      }
    } catch (error) {
      message.value = 'Email confirmation failed: Invalid token or user.';
    }
  };

  const logout = async () => {
    try {
      const newStatus = await authAPI.logout();
      if (newStatus) {
        jwtToken.value = null;
        window.localStorage.removeItem('jwt_token');
        router.push('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      message.value = 'Logout failed: Unable to process the request.';
    }
  };

  const forgotPassword = async (email: UserEmail) => {
    try {
      const newStatus = await authAPI.forgotPassword(email);
      if (newStatus) {
        status.value = newStatus;
        message.value = 'Un mail a été envoyé à votre email. Cliquez sur le lien pour réinitialiser votre mot de passe.';
        router.push('/confirmModal');
      } else {
        throw new Error('Forgot password failed');
      }
    } catch (error) {
      message.value = 'Forgot password failed: Unable to send reset email.';
    }
  };

  const resetPassword = async (payload: { user: ResetPassword; emailToken: string; }) => {
    try {
      const token = await authAPI.resetPassword(payload.user, payload.emailToken);
      if (token) {
        decodeAndStoreToken(token);
        message.value = 'Bienvenue ! Votre mot de passe a été réinitialisé avec succès.';
        router.push('/confirmModal');
      } else {
        throw new Error('Reset password failed');
      }
    } catch (error) {
      message.value = 'Reset password failed: Invalid token or user.';
    }
  };

  const updateMyPassword = async (user: UpdatePassword) => {
    try {
      const currentJwtToken = jwtToken.value;
      if (!currentJwtToken) {
        message.value = 'Échec : Vous n\'êtes pas connecté. Veuillez vous connecter avant de mettre à jour votre mot de passe !';
        router.push('/confirmModal');
      } else {
        const token = await authAPI.updateMyPassword(user, currentJwtToken);
        if (token) {
          decodeAndStoreToken(token);
          message.value = 'Mot de passe mis à jour avec succès !';
          router.push('/confirmModal');
        } else {
          throw new Error('Update password failed');
        }
      }
    } catch (error) {
      message.value = 'Update password failed: Unable to update password.';
    }
  };

  const hasRole = (userRole: UserRole) => roles.value && roles.value.includes(userRole);

  return {
    jwtToken,
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
    hasRole,
  };
});
