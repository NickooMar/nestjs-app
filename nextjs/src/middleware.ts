import createMiddleware from "next-intl/middleware"
export { auth as authMiddleware } from "@/auth"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(es|en)/:path*"],
}
