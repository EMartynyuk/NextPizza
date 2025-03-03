import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma/prisma";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ account, user }) => {
      if (account?.provider !== "credentials") {
        if (!user?.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: user.email,
              },
              {
                provider: account?.provider,
                providerId: account?.providerAccountId?.toString(),
              },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId?.toString(),
            },
          });
        } else {
          await prisma.user.create({
            data: {
              fullName: user.name || "User #" + user.id,
              email: user.email,
              verified: new Date(),
              provider: account?.provider,
              providerId: account?.providerAccountId?.toString(),
            },
          });
        }

        return true;
      }

      return true;
    },
    jwt: async ({ token }) => {
      if (token?.email) {
        const findUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        });

        if (findUser) {
          token.id = String(findUser.id);
          token.email = findUser.email;
          token.fullName = findUser.fullName;
          token.role = findUser.role;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.fullName = token.fullName;
        session.user.role = token.role as "ADMIN" | "USER";
      }

      return session;
    },
    // authorized: async ({ auth, request }) => {
    //   console.log(123123);

    //   return auth?.user
    //     ? true
    //     : NextResponse.redirect(new URL("/", request.url));
    // },
  },
  ...authConfig,
});
