import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}).max(30, {message: 'Too long'}),
    username: z.string().min(2, {message: 'Too short'}).max(30, {message: 'Too long'}),
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, { message: 'Password must be at least 8 characters'})
  })

export const SigninValidation = z.object({
  email: z.string().email({message: 'Invalid email'}),
  password: z.string().min(8, { message: 'Password must be at least 8 characters'})
})

