import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://jubail24-news-bangla.vercel.app/"
})
export const { signIn, signUp,signOut, useSession } = createAuthClient()