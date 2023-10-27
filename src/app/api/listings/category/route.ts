import prisma from "@/utils/database";

export const POST = async (request: Request) => {
  try {
    const { category } = await request.json();

    if (!category) {
      return new Response(
        JSON.stringify({ message: "some field are missing!" }),
        { status: 400 }
      );
    }

    const listings = await prisma.listing.findMany({
      where: { advert_type: `for ${category}` },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            alternate_email: true,

            phone_no: true,
            whatsapp_no: true,
          },
        },
        Uploads: {
          select: {
            url: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
   return new Response(JSON.stringify({ message: "Internal server error" }), {
     status: 500,
   });
  }
};
