"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "@/navigation"

export default function Index() {
  const router = useRouter()

  return (
    <div>
      <Button type="button" onClick={() => router.push("/signin")}>
        Signin
      </Button>
    </div>
  )
}
