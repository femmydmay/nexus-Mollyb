import prisma from "@/utils/database";
import { Listing } from "@prisma/client";
export const GET = async (request: Request) => {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        Uploads: {
          select: {
            id: true,
            url:true
          },

          
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
            id:true,
          }
        },
       
        
        
    }});
    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    
   return new Response(JSON.stringify({ message: "Internal server" }), {
     status: 500,
   });
    
  }
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const { title, state, city, country, id, } = body as Listing;

    if (!title || !state || !city || !country || !id) {
      return new Response(JSON.stringify({ message: "missing entry" }), {
        status: 400,
      });
    }


    

const {  Uploads, ...rest} = body 
    const listing = await prisma.listing.findFirst({ where: { id } });
    if (!listing) {
      return new Response(JSON.stringify({ message: "listing not found" }), {
        status: 404,
      });
    }
    if (Uploads.length > 0) {
      Uploads.forEach(async (image:{id:string, url:string}) => {
        
        const updateImages = await prisma.uploads.update({ where: { id: image.id }, data: { url: image.url } })
      })
    }
    
    const updatedlisting = await prisma.listing.update({
      where: { id },
      data: {
        ...rest, 
      
        
      }
    })

    
    if (updatedlisting) {
      return new Response(JSON.stringify(updatedlisting), {
        status: 200,
      });
    }
  } catch (err) {

    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

