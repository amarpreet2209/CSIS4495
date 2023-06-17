import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";


const adminEmails = ['amaraws002@gmail.com'];
export default NextAuth({
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session : ({session, account, user}) => {
            if (adminEmails.includes(session?.user?.email))
            {
                return session;
            }
            else {
                return false;
            }
        }
    }
})
