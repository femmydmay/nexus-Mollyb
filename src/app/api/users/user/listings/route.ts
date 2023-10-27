

import prisma from "@/utils/database";
import { getErrorResponse } from "@/lib/helpers";
export const GET = async (request: Request) => {
  try {

   
        const userId = request.headers.get("X-USER-ID");
    
  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access"
    );
  }
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        email_verified: true,
        id: true,
        whatsapp_no: true,
        alternate_email: true,
        image: true,
        phone_no: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const listing = await prisma.listing.findMany({
      where: { userId: user.id },
      include: {
        Uploads: {
          select: {
            url: true,
            id:true
          }
        }
      }
    });
    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
