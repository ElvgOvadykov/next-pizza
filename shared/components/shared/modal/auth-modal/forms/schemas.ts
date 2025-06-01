import { z } from "zod";

const passwordSchema = z
  .string()
  .min(4, { message: "Пароль не должен содержать меньше 6 символов" });

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Минимум 2 символа" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
