
import prisma from "@/utils/database";

import { getErrorResponse } from "@/lib/helpers";
export const GET = async (req: Request) => {
  try {
           const userId = req.headers.get("X-USER-ID");
        
           if (!userId) {
             return getErrorResponse(
               401,
               "You are not logged in, please provide token to gain access"
             );
           }

    const subscriptions = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        subscriptions: true,
        plan: true,
      },
    });

    return new Response(JSON.stringify(subscriptions), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }));
  }
};
