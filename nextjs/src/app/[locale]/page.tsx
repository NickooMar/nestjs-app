"use client"

import { ModeToggle } from "@/app/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { useRouter } from "@/navigation"

export default function Index() {
  const router = useRouter()

  return (
    <div>
      <ModeToggle />
      <Button type="button" onClick={() => router.push("/signin")}>
        Signin
      </Button>
    </div>
  )
}
