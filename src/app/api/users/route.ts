import prisma from "@/utils/database";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        alternate_email: true,
        whatsapp_no: true,
        image: true,
        email: true,
        role: true,
        email_verified: true,
      },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

export const PUT = async (request: Request) => {
  try {
    const data = await request.json();

    const user = await prisma.user.findFirst({ where: { id: data.id } });
    if (!user) {
      return new Response(JSON.stringify({ message: "user not found" }), {
        status: 404,
      });
    }

    const updateduser = await prisma.user.update({
      where: { id: user.id },
      data,
      select: {
        firstname: true,
        lastname: true,
        email: true,
        email_verified: true,
        whatsapp_no: true,
        alternate_email: true,
        role: true,
        image: true,
      },
    });
    return new Response(JSON.stringify({ updateduser }), { status: 200 });
  } catch (error) {
       return new Response(JSON.stringify({ message: "Internal server" }), {
         status: 500,
       });
  }
};
