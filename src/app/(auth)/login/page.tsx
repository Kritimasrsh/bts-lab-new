import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in | BTS Lab" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    const { callbackUrl } = await searchParams;
    // Honor a relative callbackUrl (e.g. /admin) instead of always /account.
    redirect(callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/account");
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to track repairs and manage your account.">
      <Suspense fallback={<div className="skeleton h-96 rounded-2xl" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
