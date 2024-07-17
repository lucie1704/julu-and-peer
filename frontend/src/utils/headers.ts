
const  jwt_token = window.localStorage.getItem('jwt_token');

export const headers = () => ({
  Authorization: `Bearer ${jwt_token}`,
  'Content-Type': 'application/json'
});