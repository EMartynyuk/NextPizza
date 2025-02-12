import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(ingredients);
}
