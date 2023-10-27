import prisma from "../../../utils/database";
export const GET = async (request: Request) => {
  try {
    const plans = await prisma.plan.findMany();
    return new Response(JSON.stringify(plans), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
 
    const id = request.headers.get('x-user-id') as string;
    const user = await prisma.user.findUnique({ where: { id: id } })
    if (!user) {
      return new Response(JSON.stringify({message:"user not found"}), {status:404})
    }

    if (user.role !== 'ADMIN') {
      return new Response(JSON.stringify({ message:"you are not authorized  here" }), {status:401})
    }

    const {
      title,
      price,
      image_uploads,
      listings_per_month,
      listing_expiry,
      other_features,
    } = data;
    if (
      !title ||
      !image_uploads ||
      !listings_per_month ||
      !listing_expiry ||
      !other_features
    ) {
      return new Response(
        JSON.stringify({ message: "one or more fields are missing" }),
        { status: 400 }
      );
    }

    await prisma.plan.create({ data });

    return new Response(
      JSON.stringify({ message: "plan created successfully" }),
      { status: 200 }
    );
  } catch (error) {


    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
