import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/prisma-client";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Вы не авторизованы" },
        { status: 401 }
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
        role: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error [PROFILE_GET]: ", error);
    return NextResponse.json(
      { message: "[PROFILE_GET] server error" },
      { status: 500 }
    );
  }
}
