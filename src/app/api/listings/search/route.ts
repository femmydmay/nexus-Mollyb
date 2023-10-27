import prisma from "@/utils/database"

 // Make sure to import Request and Response from the correct package
type WhereCondition = {
  title: { contains: string };
  advert_type: { contains: string };
  property_type: { contains: string };
    price: { gt: number };
  state: { contains : string };
};
export const POST = async (request: Request) => {
  try {
    const { search, type, property_type, price, state } = await request.json();

    const whereConditions = {}   as WhereCondition;

    // Build the query dynamically based on the provided options
    if (search ) {
      whereConditions.title = {
        contains: search,
      };
    }
    
    if (type) {
      whereConditions.advert_type = {
        contains: type,
      };
    }
    
    if (property_type) {
      whereConditions.property_type = {
        contains: property_type,
      };
    }
    if (state) {
      whereConditions.state = {
        contains: state
      };
    }
    
    if (price) {
      whereConditions.price = {
        gt: Number(price),
      };
    }

    
    
    const listings = await prisma.listing.findMany({
      where: {
        OR: [
          whereConditions, 
        ],
      },
      include: {
        Uploads: {
          select: {
            id: true,
            url: true,
          },
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
            id: true,
          },
        },
      },
    });

      return new Response(JSON.stringify(listings), { status: 200 })
  } catch (error) {

    return new  Response(JSON.stringify({message:"internal server error"}), { status: 500});
  }
};
