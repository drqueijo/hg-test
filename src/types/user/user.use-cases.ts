import { z } from "zod";

export const loginUserUseCase = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export const registerUserUseCase = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type LoginUserUseCase = z.infer<typeof loginUserUseCase>;
export type RegisterUserUseCase = z.infer<typeof registerUserUseCase>;
