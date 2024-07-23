import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: string;
}

export const getUserId = (): string => {
  const token = window.localStorage.getItem('jwt_token');
  if (!token) {
    throw new Error('No JWT token found in local storage');
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.id;
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
};
