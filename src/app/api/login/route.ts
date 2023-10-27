import  { compareSync } from "bcrypt-ts";

import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { signJWT } from "@/lib/token";
import { NextResponse } from "next/server";
import prisma from "@/utils/database";
import { User } from "@prisma/client";
export const POST = async (request: Request) => {
  try {
    const { email, password:pass } = await request.json();

    if (!email || !pass) {
      return new Response(
        JSON.stringify({ message: "some fields are missing" }),
        { status: 400 }
      );
    }
    

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    
    });

    const {password, ...rest} = user as User

    if (!user) {
      return new Response(JSON.stringify({ message: "invalid user" }), {
        status: 400,
      });
    }


    const isPass = compareSync(pass, user.password);
    
    if (!isPass) {
      return new Response(
        JSON.stringify({ message: "incorrect password or user" }),
        { status: 404 }
      );
    }


    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");
      const token = await signJWT(
        { sub: user.id },
        { exp: `${JWT_EXPIRES_IN}m` }
      );
    
      const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
      const cookieOptions = {
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        maxAge: tokenMaxAge,
      };
    
    const response = new NextResponse(
      JSON.stringify({...rest}),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

     await Promise.all([
       response.cookies.set(cookieOptions),
       response.cookies.set({
         name: "logged-in",
         value: "true",
         maxAge: tokenMaxAge,
       }),
     ]);
   
    return response;
  } catch (error) {
  console.log(error);
  
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
