import { z } from 'zod';

export const emailSchema = z.string().min(5, {
  message: '5 characters minimum'
}).max(30, {
  message: '30 characters maximum'
}).email({
  message: 'Please provide a valid email'
});

export const passwordSchema = z.string()
.min(12, {
  message: '12 characters minimum'
}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, {
  message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
});

