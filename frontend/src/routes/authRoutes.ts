import ConfirmEmail from "../components/authentification/confirmEmail.vue";
import ConfirmModal from "../components/authentification/ConfirmModal.vue";
import ForgotPassword from "../components/authentification/ForgotPassword.vue";
import Login from "../components/authentification/Login.vue";
import ResetPassword from "../components/authentification/ResetPassword.vue";
import SignUp from "../components/authentification/SignUp.vue";
import UpdatePassword from "../components/authentification/UpdatePassword.vue";
import HomeView from "../view/HomeView.vue";


const authRoutes = [
  { path: '/', component: HomeView },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/confirmModal', component: ConfirmModal },
  { path: '/confirmEmail/:token', component: ConfirmEmail },
  { path: '/forgotPassword', component: ForgotPassword },
  { path: '/resetPassword/:token', component: ResetPassword },
  { path: '/updatePassword', component: UpdatePassword,  meta: {
    requiresAuth: true
  },},

]

export default authRoutes;