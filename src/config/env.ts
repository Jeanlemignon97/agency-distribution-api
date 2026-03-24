import { z } from "zod";
import dotenv from "dotenv";


// charge les variables depuis .env dans process.env.
dotenv.config();


// Valide les variables d'environnement
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"), // convertit la valeur en enum
    PORT: z.coerce.number().int().positive().default(3000), // convertit la valeur en nombre entier positif
});


// Parse les variables d'environnement
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment variables:", parsedEnv.error.issues);
    process.exit(1);
}

export const env = parsedEnv.data;
