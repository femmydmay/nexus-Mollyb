import prisma from "@/utils/database";
import {genSaltSync, hashSync} from "bcrypt-ts";
import passwordvalidator from "@/utils/passvalidator";
export const DELETE = async (
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

    const del = await prisma.user.delete({ where: { id } });

    if (!del) {
      return new Response(JSON.stringify({ message: "error deleting user" }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ message: "user deleted successfully" }),
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
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "missing params" }), {
        status: 400,
      });
    }

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      return new Response(JSON.stringify({ message: "user not found" }), {
        status: 404,
      });
    }
    const body = await request.json();

    const {
      firstname,
      lastname,

      email,
      password,
      passwordConfirmation,
      email_verified,
      role,
    } = body;

    if (!firstname || !lastname || !email || !role) {
      return new Response(JSON.stringify({ message: "missing fields" }), {
        status: 400,
      });
    }

    let data;
    data = { firstname, lastname, email, email_verified, role };
    if (password) {
      if (!passwordvalidator.validate(password)) {
        return new Response(JSON.stringify({ message: "invalid password" }), {
          status: 400,
        });
      }

      if (password !== passwordConfirmation) {
        return new Response(JSON.stringify({ message: "password mismatch" }), {
          status: 400,
        });
      }

      const salt = genSaltSync(10);

      const hashedPassword = hashSync(password, salt);
      data = {
        firstname,
        lastname,

        email,
        password: hashedPassword,
        email_verified,
        role,
      };
    }

    const updated_user = await prisma.user.update({
      where: { id },
      data,
    });

    return new Response(JSON.stringify(updated_user), { status: 200 });
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
      return new Response(JSON.stringify({ message: "no user found" }), {
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
