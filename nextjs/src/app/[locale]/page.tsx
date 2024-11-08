import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";
import { getLocaleHeader } from "./server";
import React from "react";

export default async function Index() {
  const localeHeader = await getLocaleHeader();

  return (
    <div>
      <p>Locale Header: {localeHeader}</p>
      <Button type="button">Signin</Button>
    </div>
  );
}
