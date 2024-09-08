// Whatever goes in this file only applies to /login and /signup
// This is because it is a child of the (auth) folder and applies to all routes within that folder

import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest(); // Fetches Session 

  if (!session.user) redirect("/login"); // Checks if user is logged in

  return <SessionProvider value={session}>{children}</SessionProvider>; // Makes Sessions content available to all children so you do not have to fetch there for it.
}
