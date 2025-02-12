import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать не менее 6 символов" });

export const loginFormSchema = z.object({
  email: z.string().email("Введите корректную почту"),
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .extend({
    fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

export type TLoginFormData = z.infer<typeof loginFormSchema>;
export type TRegisterFormData = z.infer<typeof registerFormSchema>;
