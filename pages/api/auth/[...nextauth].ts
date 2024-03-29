import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '@/database';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo:',
          type: 'email',
          placeholder: 'correo@google.com',
        },
        password: {
          label: 'Contraseña:',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      //@ts-ignore
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Custom pages
  pages: {
    signIn: '/auth/login', // Displays signin buttons
    newUser: '/auth/register', // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Callbacks
  // Por defecto, NextAuth.js maneja los callbacks con jwt.
  // Ahora NextAuth.js para requiere de la variable de entorno NEXTAUTH_SECRET para firmar los tokens.
  callbacks: {
    async jwt({ token, user, account }: any) {
      // user es lo que se retorna en el callback de authorize.
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || '',
              user?.name || ''
            );
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      // token es lo que retorna el callback de jwt.
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
