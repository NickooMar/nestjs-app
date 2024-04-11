import { ModeToggle } from "@/app/components/ModeToggle"

export default function Index() {
  return (
    <div>
      <ModeToggle />
      <h1>{process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}</h1>
      <h1>{process.env.AUTH_GOOGLE_ID}</h1>
    </div>
  )
}
