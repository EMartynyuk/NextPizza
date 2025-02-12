import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma/prisma";
import { compare } from "bcryptjs";

export default {
  providers: [
    GitHub({
      profile: (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER",
        };
      },
    }),
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!password || !email) {
          return null;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!findUser) {
          return null;
        }

        const isPasswordCorrect = await compare(
          String(password),
          String(findUser.password)
        );

        if (!isPasswordCorrect) {
          return null;
        }

        // if (!findUser.verified) {
        //   return null;
        // }

        return {
          id: String(findUser.id),
          email: findUser.email,
          fullName: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
