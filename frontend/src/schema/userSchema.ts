import { z } from 'zod';
import { CustomerSchema } from '~/schema/customerSchema';

const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  updatedAt: z.string(),
  createdAt: z.string(),
  deletedAt: z.string().nullable(),
  Customer: CustomerSchema.optional(),
});

export { UserSchema };