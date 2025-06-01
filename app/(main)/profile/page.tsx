import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components/shared";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.user.id),
    },
  });

  if (!user) {
    return redirect("/not-auth");
  }

  return <ProfileForm user={user} />;
}
