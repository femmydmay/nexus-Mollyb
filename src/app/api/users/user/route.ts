
import prisma from "@/utils/database";
import { getErrorResponse } from "@/lib/helpers";
export const GET = async (req: Request) => {
  try {

        const userId = await req.headers.get("x-user-id");
    
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
        role: true,
      
        image: true,
        phone_no: true,
        plan: {
          select: {
            title: true,
          },
        },
      },
    });
    

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const data = await req.json();
    const { id, ...rest } = data;
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      return new Response(JSON.stringify({ message: "user not found" }), {
        status: 404,
      });
    }

   

    const updated = await prisma.user.update({
      where: { id },
      data: rest,
      select: {
        firstname: true,
        lastname: true,
        email: true,
        alternate_email: true,
        whatsapp_no: true,
        image: true,
        id: true,
      },
    });
    if (updated) {
      return new Response(JSON.stringify(updated), { status: 200 });
    }
  } catch (error) {

  }
};
