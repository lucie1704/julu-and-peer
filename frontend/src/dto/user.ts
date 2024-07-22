import { Customer } from '~/dto/customer';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  Customer?: Customer;
}