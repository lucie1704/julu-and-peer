import { z } from 'zod';

export const nameSchema = z.string().min(5, {
  message: '5 characters minimum'
}).max(30, {
  message: '30 characters maximum'
});

