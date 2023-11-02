import prisma from "@/utils/database";
import { getErrorResponse } from "@/lib/helpers";
import { getOneMonthFromNow } from "@/utils/functions";
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const {
      state,
      city,
      country,
      title,
      address,
      property_type,

      description,
    } = body;

    if (
      !state ||
      !city ||
      !country ||
      !title ||
      !address ||
      !property_type ||
      !description
    ) {
      return new Response(
        JSON.stringify({ message: "Required field missing" }),
        { status: 400 }
      );
    }
    const userId = request.headers.get("X-USER-ID");

    if (!userId) {
      return getErrorResponse(
        401,
        "You are not logged in, please provide token to gain access"
      );
    }

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    
    
    const show_addres =
    body.show_address.toLowerCase() === "true" ? true : false;
    const { images, bedrooms, toilets, facilities, price, uploads, ...rest } =
    body;
    
    const loads = []
    for (const d of uploads){
  
      const up = await prisma.uploads.create({ data: { url:d.url, userId: user.id, upload_type:d.upload_type } })
      loads.push({id:up.id,})
}
    const listing = await prisma.listing.create({
      data: {
        ...rest,
        bedrooms: Number(bedrooms),
        toilets: Number(toilets),
        facilities: JSON.stringify(facilities),
        show_address: show_addres,
        userId: user.id,
        price: Number(price),
        Uploads: {
          connect: loads,
        },
        expirationDate: getOneMonthFromNow(),
      },
    });

    return new Response("success", { status: 200 });
  } catch (err) {
   console.log(err);
   
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
