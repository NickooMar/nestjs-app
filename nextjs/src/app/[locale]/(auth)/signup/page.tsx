// import React from "react"

// const SignupPage = () => {
//   return <div>SignupPage</div>
// }

// export default SignupPage

import { signIn } from "@/auth"

function SignupPage() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
}

export default SignupPage
