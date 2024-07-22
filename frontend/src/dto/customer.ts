export interface UserI {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CustomerI {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  User: UserI;
}

export interface CustomerUpdateI {
  userId: string;
  firstName: string;
  lastName: string;
}

