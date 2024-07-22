import { z } from 'zod';

const CustomerSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export {
  CustomerSchema,
};
