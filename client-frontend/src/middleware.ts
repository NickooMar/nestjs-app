import { routing } from "./i18n/routing";
export { auth as middleware } from "@/auth";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|es)/:path*"],
};
