import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch features from database
    const features = await prisma.features.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        roles: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (features.length === 0) {
      return NextResponse.json(
        { data: [] },
        { status: 200 }
      );
    }

    // Transform data to match frontend interface
    const transformedFeatures = features.map((feature) => ({
      id: feature.id,
      title: feature.name,
      description: `Access ${feature.name} feature`,
      url: feature.url,
    }));

    return NextResponse.json(
      { data: transformedFeatures },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch system features:", error);
    return NextResponse.json(
      { message: "Failed to fetch features", data: [] },
      { status: 500 }
    );
  }
}
