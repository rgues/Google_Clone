import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler =  async function auth(req: NextApiRequest, res: NextApiResponse) {
    
  const providers = [
    GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    })
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query && req.query.nextauth && req.query.nextauth.includes("signin")

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
    pages:{
        signIn: '/auth/signin'
    }
  })
}

 export  { handler as GET, handler as POST }
