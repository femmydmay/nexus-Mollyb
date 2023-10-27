import prisma from "@/utils/database";

export const GET = async (request: Request) => {
  try {
    const subscription = await prisma.subscription.findMany();
    return new Response(JSON.stringify(subscription), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
