import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
  const response = new NextResponse(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

       

          await Promise.all([
            response.cookies.set({
              name: "token",
              value: "",
              maxAge: -1,
            }),
            response.cookies.set({
              name: "logged-in",
              value: "",
              maxAge: -1,
            }),
          ]);
    

        return response
    } catch (error) {
        
    }
}