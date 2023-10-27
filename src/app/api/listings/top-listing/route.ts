import prisma from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
  const userid = req.headers.get("x-user-id") as string;
  const user = await prisma.user.findUnique({ where: { id: userid } });
  if (!user) {
    return new Response(JSON.stringify({ message: "user not found" }), {
      status: 404,
    });
  }

  if (user.role !== "ADMIN") {
    return new Response(
      JSON.stringify({ message: "you are not authorized  here" }),
      { status: 401 }
    );
  }

    const { id } = data;
   
    if (!id) {
      return new Response(JSON.stringify({ message: "missing field" }), {
        status: 400,
      });
    }
    
      const listing = await prisma.listing.findFirst({ where: { id: id } });

      
    if (!listing) {
      return new Response(JSON.stringify({ message: "listing not found" }), {
        status: 404,
      });
    }


 
      
    const topListings = await prisma.listing.update({ where: { id: id }, data:{TopListings:true} })
    if (topListings) {
      return new Response(
        JSON.stringify({ message: "success", data: topListings }),
        { status: 200 }
      );
    }
  } catch (err) {


    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

export const GET = async (req: Request) => {
  try {
    const topListings = await prisma.listing.findMany({
      where:{TopListings:true},
      include: {
       
            Uploads: {
              select: {
                url: true,
                id: true,
                
            }
            },
            user: {
              select: {
                firstname: true,
                lastname: true,
                email: true,
                whatsapp_no: true,  
                phone_no:true
              }
            }
        
        
    }})
    if (topListings) {
      return new Response(
        JSON.stringify( topListings ),
        { status: 200 }
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};


export const PUT = async (req: Request) => {
  try {
    const data = await req.json();

  const userid = req.headers.get("x-user-id") as string;
  const user = await prisma.user.findUnique({ where: { id: userid } });
  if (!user) {
    return new Response(JSON.stringify({ message: "user not found" }), {
      status: 404,
    });
  }

  if (user.role !== "ADMIN") {
    return new Response(
      JSON.stringify({ message: "you are not authorized  here" }),
      { status: 401 }
    );
  }
    const { id } = data;
  
    if (!id) {
      return new Response(JSON.stringify({ message: "missing field" }), {
        status: 400,
      });
    }

    const listing = await prisma.listing.findFirst({ where: { id: id } });

    if (!listing) {
      return new Response(JSON.stringify({ message: "listing not found" }), {
        status: 404,
      });
    }

    const topListings = await prisma.listing.update({
      where: { id: id },
      data: { TopListings: false },
    });
    if (topListings) {
      return new Response(
        JSON.stringify({ message: "success", data: topListings }),
        { status: 200 }
      );
    }
  } catch (err) {

    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};




