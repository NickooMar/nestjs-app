import { useTranslations } from "next-intl"
import { ModeToggle } from "@/app/components/ModeToggle"

export default function Index() {
  const t = useTranslations("Index")
  return (
    <div>
      <ModeToggle />
      <h1>{t("title")}</h1>
    </div>
  )
}
