import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import config from '@/config';
import connectMongo from './mongo';

interface NextAuthOptionsExtended extends NextAuthOptions {
	adapter?: any;
}

export const authOptions: NextAuthOptionsExtended = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? '',
			clientSecret: process.env.GOOGLE_SECRET ?? '',
			async profile(profile) {
				return {
					id: profile.sub,
					name: profile.given_name ? profile.given_name : profile.name,
					email: profile.email,
					image: profile.picture,
					createdAt: new Date(),
				};
			},
		}),
	],
	adapter: connectMongo ? MongoDBAdapter(connectMongo) : undefined,

	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user && token.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
};

export default NextAuth(authOptions);
