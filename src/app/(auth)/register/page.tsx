import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Create account | BTS Lab" };

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/account");

  return (
    <AuthShell
      title="Create your account"
      subtitle="Book repairs faster and track everything in one place."
    >
      <Suspense fallback={<div className="skeleton h-96 rounded-2xl" />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
