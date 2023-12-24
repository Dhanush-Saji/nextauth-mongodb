import { connectDb } from "@/utils/config/dbConfig";
import { UserModel } from "@/utils/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import {toast } from 'react-toastify';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDb();
          const user = await UserModel.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcryptjs.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({user,account}){
      if(account.provider == 'google'){
        try {
          const {name,email} = user
          await connectDb()
          const ifUserExist = await UserModel.findOne({email})
          if(ifUserExist){
            return user
          }
        const newUser = await UserModel({name,email})
        const res = await newUser.save()
        if(res.status == 200 || res.status == 201){
          return user
        }
        } catch (error) {
          console.log(error)
        }
      }
      return user
    },
    async jwt ({ token, user }){
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }){
      if (session?.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:'/login'
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
