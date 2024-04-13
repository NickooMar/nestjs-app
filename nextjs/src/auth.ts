import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        console.log({ profile })
        
        let userRole = "Google User"

        return { ...profile, id: profile.sub, role: userRole }
      },
    }),
  ],
})
