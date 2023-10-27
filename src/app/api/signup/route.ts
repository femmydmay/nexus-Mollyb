import passwordvalidator from "@/utils/passvalidator";
import {genSaltSync, hashSync} from "bcrypt-ts";
import prisma from "@/utils/database";
import { basicplan, freeplan, goldplan, platinumplan } from "@/utils/data";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstname,
      lastname,
  phone_no,
      email,
      password,
      passwordConfirmation,
    } = body;

    if (
      !firstname ||
      !lastname ||
      !password ||
      !passwordConfirmation ||
      !email
    ) {
      return new Response(JSON.stringify({ message: "missing fields" }), {
        status: 400,
      });
    }
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

    const result = await prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (result) {
      return new Response(JSON.stringify({ message: "username taken" }), {
        status: 400,
      });
    }

    const salt = genSaltSync(10);

    const hashedPassword = hashSync(password, salt);
    const plan = await prisma.plan.findFirst({
      where: { title: "Free Plan" },
    });

    if (!plan) {
      const free = await prisma.plan.create({ data: freeplan });
      const basic = await prisma.plan.create({ data: basicplan });
      const gold = await prisma.plan.create({ data: goldplan });
      const platinum = await prisma.plan.create({ data: platinumplan });
      const subscription = await prisma.subscription.create({
        data: { planId: free?.id },
      });
      const newUser = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          phone_no,
          password: hashedPassword,
          planId: free?.id,
          subscriptionId: subscription.id,
        },
      });
      return new Response(
        JSON.stringify({ message: "user created with new plan" }),
        {
          status: 200,
        }
      );
    }
    const subscription = await prisma.subscription.create({
      data: { planId: plan?.id },
    });
    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        planId: plan?.id,
        subscriptionId: subscription.id,
      },
    });

    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
}
