"use server";

import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validations";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if(existingUsername){
        return {
            error: "Username already taken"
        }
    }
    

  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong. Please try again",
    };
  }
}
