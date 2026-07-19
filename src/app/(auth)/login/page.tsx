import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in | BTS Lab" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/account");

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to track repairs and manage your account.">
      <Suspense fallback={<div className="skeleton h-96 rounded-2xl" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
