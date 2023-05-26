import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

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
      // @ts-ignore
      async authorize(credentials) {
        // @ts-ignore
        return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Callbacks
  // Por defecto, NextAuth.js maneja los callbacks con jwt.
  // Ahora NextAuth.js para requiere de la variable de entorno NEXTAUTH_SECRET para firmar los tokens.
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
