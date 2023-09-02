"use client";
import { sing } from "crypto";
import { useSession, signIn, signOut } from "next-auth/react";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
