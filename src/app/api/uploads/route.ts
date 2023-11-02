import { writeFile } from "fs/promises";
import prisma from "@/utils/database";
import { getErrorResponse } from "@/lib/helpers";
import { isFileSizeValid } from "@/utils/functions";

export const POST = async (request: Request) => {
  try {


            const userId = request.headers.get("X-USER-ID");
 
            if (!userId) {
              return getErrorResponse(
                401,
                "You are not logged in, please provide token to gain access"
              );
            }
    const data = await request.formData();

    const file = data.get("file") as File;


    if (!file) {
      return new Response(
        JSON.stringify({ message: "some fields are missing" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return new Response(JSON.stringify({ message: "not found" }), { status: 404 })
    }

    const validfile = isFileSizeValid(
      file,
      file.type.startsWith("image") ? 10000 : 15000
    );
    if (!validfile) { 
      return new Response(JSON.stringify({message: `${file.name} is  too large`},), { status: 400})
    }


    const upload_type = file.type.startsWith("image") ? "Image" : "Video"


    const ext = file.name.split(".").pop();
    const date = Date.now();
    const newfilename = "nexus-uploads-"+file.name.split('.')[0] +  "." + ext;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `./public/uploads/${newfilename}`;


    await writeFile(path, buffer);
    const url = `/uploads/${newfilename}`;
    const upload = await prisma.uploads.create({data:{url, upload_type, userId:user.id}})
    if (upload) {
console.log(upload);

      return new Response(JSON.stringify({id:upload.id}), { status: 200 });
    }
  } catch (error) {


  
          return new Response(JSON.stringify("internal server error"), { status: 500 });
  }
};


export const GET = async (req: Request) => {
  try {
    
    const files = await prisma.uploads.findMany()
    
    return new Response(JSON.stringify(files), { status: 200 });
    
    
  } catch (error) { 
  
          return new Response(JSON.stringify("internal server error"), {
            status: 500,
          });
  }
}
