import prisma from "@/utils/database";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {

      const userid = request.headers.get("x-user-id") as string;
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
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ message: "missing params" }), {
        status: 400,
      });
    }

    const del = await prisma.plan.delete({ where: { id } });

  

    if (!del) {
      return new Response(JSON.stringify({ message: "error deleting plan" }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ message: "plan deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {

      const userid = request.headers.get("x-user-id") as string;
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
    
    
    
    
    
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "missing params" }), {
        status: 400,
      });
    }

    const plan = await prisma.plan.findFirst({ where: { id } });

    if (!plan) {
      return new Response(JSON.stringify({ message: "no plans matched" }), {
        status: 404,
      });
    }
    const data = await request.json();

    
    
    const updated_plan = await prisma.plan.update({
      where: { id },
      data,
    });

    return new Response(JSON.stringify(updated_plan), { status: 200 });
  } catch (error) {
    
    
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "missing params" }), {
        status: 400,
      });
    }

    const plan = await prisma.plan.findFirst({ where: { id } });

    if (!plan) {
      return new Response(JSON.stringify({ message: "no plans matched" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(plan), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
