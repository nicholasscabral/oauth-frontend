"use client";

import { useSearchParams } from "next/navigation";

type OAuthCallbackProps = { params: { provider: "google" | "github" } };

export default function OauthCallback({ params }: OAuthCallbackProps) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <h1>
      Usuario {email} logou pelo {params.provider}
    </h1>
  );
}
