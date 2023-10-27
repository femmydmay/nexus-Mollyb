import { writeFile } from "fs/promises";
import prisma from "@/utils/database";


import { getErrorResponse } from "@/lib/helpers";
export const POST = async (request: Request) => {
  try {
        const userId = request.headers.get("X-USER-ID");
 
        if (!userId) {
          return getErrorResponse(
            401,
            "You are not logged in, please provide token to gain access"
          );
        }
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const data = await request.formData();
    const file = data.get("image") as File;

    if (!file) {
      return new Response(
        JSON.stringify({ message: "some fields are missing" }),
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop();
    const date = Date.now();
    const newfilename = "nexus-listing-" + date + "." + ext;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `./public/uploads/${newfilename}`;

    await writeFile(path, buffer);
    const updateduser = await prisma.user.update({
      where: { id: user.id },
      data: { image: `http://localhost:3000/uploads/${newfilename}` },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        email_verified: true,
        id: true,
        whatsapp_no: true,
        alternate_email: true,
        image: true,
        phone_no: true,
      },
    });
    if (updateduser) {
      return new Response(JSON.stringify(updateduser), { status: 200 });
    }
  } catch (error) {}
};
