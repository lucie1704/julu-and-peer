export interface UserI {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CustomerI {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  User: UserI;
}

export interface CustomerUpdateI {
  userId: number;
  firstName: string;
  lastName: string;
}

