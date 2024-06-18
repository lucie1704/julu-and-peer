import { z } from 'zod';


const generateRegexSchema = (message: string) => {
  return z.string().min(12, { message: "12 characters minimum" }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    { message }
  );
};


export const currentPasswordSchema = generateRegexSchema(
  "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
);

export const passwordSchema = generateRegexSchema(
  "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
);

