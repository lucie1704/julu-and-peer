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
  const msg = ref<string>('');

  const isAuthenticated = computed(() => !!jwtToken.value);
  const isStatus = computed(() => !!status.value);
  const message = computed(() => msg.value);

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
        throw new Error('Identifiants de connexion invalides');
      }
    } catch (error) {
      msg.value = 'Échec de la connexion : Nom d\'utilisateur ou mot de passe invalide.';
    }
  };

  const signup = async (user: SignUp) => {
    try {
      const response = await authAPI.signup(user);
      if (response) {
        console.log("sign up ok");
        msg.value = 'Nous vous avons envoyé un email pour valider votre compte.';
        router.push('/confirmModal');
      } else {
        throw new Error('Échec de l\'inscription');
      }
    } catch (error) {
      msg.value = 'Échec de l\'inscription : Impossible de créer le compte. Vérifiez les valeurs saisies';
    }
  };

  const confirmEmail = async (payload: { user: ConfirmEmail; emailToken: string; }) => {
    try {
      const token = await authAPI.confirmEmail(payload.user, payload.emailToken);
      if (token) {
        decodeAndStoreToken(token);
        msg.value = 'Votre compte a été créé avec succès !';
        router.push('/');
      } else {
        throw new Error('Échec de la confirmation de l\'email');
      }
    } catch (error) {
      msg.value = 'Échec de la confirmation de l\'email : Token ou utilisateur invalide.';
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
        throw new Error('Échec de la déconnexion');
      }
    } catch (error) {
      msg.value = 'Échec de la déconnexion : Impossible de traiter la demande.';
    }
  };

  const forgotPassword = async (email: UserEmail) => {
    try {
      const newStatus = await authAPI.forgotPassword(email);
      if (newStatus) {
        status.value = newStatus;
        msg.value = 'Un mail a été envoyé à votre email. Cliquez sur le lien pour réinitialiser votre mot de passe.';
        router.push('/confirmModal');
      } else {
        throw new Error('Échec de la récupération du mot de passe');
      }
    } catch (error) {
      msg.value = 'Échec de la récupération du mot de passe : Impossible d\'envoyer l\'email de réinitialisation.';
    }
  };

  const resetPassword = async (payload: { user: ResetPassword; emailToken: string; }) => {
    try {
      const token = await authAPI.resetPassword(payload.user, payload.emailToken);
      if (token) {
        decodeAndStoreToken(token);
        msg.value = 'Bienvenue ! Votre mot de passe a été réinitialisé avec succès.';
        router.push('/confirmModal');
      } else {
        throw new Error('Échec de la réinitialisation du mot de passe');
      }
    } catch (error) {
      msg.value = 'Échec de la réinitialisation du mot de passe : Token ou utilisateur invalide.';
    }
  };

  const updateMyPassword = async (user: UpdatePassword) => {
    try {
      const currentJwtToken = jwtToken.value;
      if (!currentJwtToken) {
        msg.value = 'Échec : Vous n\'êtes pas connecté. Veuillez vous connecter avant de mettre à jour votre mot de passe !';
        router.push('/confirmModal');
      } else {
        const token = await authAPI.updateMyPassword(user, currentJwtToken);
        if (token) {
          decodeAndStoreToken(token);
          msg.value = 'Mot de passe mis à jour avec succès !';
          router.push('/confirmModal');
        } else {
          throw new Error('Échec de la mise à jour du mot de passe');
        }
      }
    } catch (error) {
      msg.value = 'Échec de la mise à jour du mot de passe : Impossible de mettre à jour le mot de passe.';
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
