import prisma from "@/utils/database";


export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "missing params" }), {
        status: 400,
      });
    }

    const listing = await prisma.listing.findFirst({
      where: { id }, include: {
        Uploads: {
          select: {
            id:true,
          url:true
          },
        
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            phone_no: true,
            whatsapp_no: true,
            alternate_email: true,
            listings:true
          }
        }
    } });

    if (!listing) {
      return new Response(JSON.stringify({ message: "no plans matched" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};


export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "listing not found" }), {
        status: 404,
      });
    }

    const deleted = await prisma.listing.delete({ where: { id } });

    if (deleted) {
      return new Response(JSON.stringify({ message: "success" }), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
