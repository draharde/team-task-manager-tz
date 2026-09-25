import { registerSchema, type RegisterFormValues } from '../model/auth.schema';

export const isRegisterField = (field: string): field is keyof RegisterFormValues =>
  field in registerSchema.shape;
