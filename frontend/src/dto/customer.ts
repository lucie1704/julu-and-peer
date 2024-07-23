export interface UserI {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface Customer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: string | null;
  updatedAt: string | null;
  User: UserI;
}

export interface CustomerUpdateI {
  userId: string;
  firstName: string;
  lastName: string;
}

