
const  token = window.localStorage.getItem('jwt_token');

export const headers = () => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});