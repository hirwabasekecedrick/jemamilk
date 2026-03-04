import z, { email, string } from "zod"
import { Roles } from "@prisma/client"
export const registerSchema = z.object({
    email: email("Invalid Email"),
    password: string().min(8, "Password weak, PLease add strong password"),
    role: z.nativeEnum(Roles)
})