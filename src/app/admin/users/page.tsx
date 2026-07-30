import { auth } from "@/auth";
import UsersManager from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  return <UsersManager currentUserId={session?.user?.id ?? ""} />;
}
