
import nodemailer from 'nodemailer'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

import prisma from "@/utils/database";
import { getErrorResponse } from "@/lib/helpers";
export const POST = async (req: Request, { params }: { params: { token: string } }) => {
  try {
    const body = await req.json();

        const userId = req.headers.get("X-USER-ID");

        if (!userId) {
          return getErrorResponse(
            401,
            "You are not logged in, please provide token to gain access"
          );
        }





      const { email, code } = body;
      const { token } = params
      
      if (!email || !code || !token) { 
          return new Response(JSON.stringify({ message: "missing fields" }), {status: 400})
      }

      const access = process.env.EMAIL_TOKEN_CODE as string; 
      const res:any = jwt.verify(token, access)
      

      if (!res) {
          return new Response(JSON.stringify({ message: "token has expired. " }), {
            status: 400,
          });
      }

      if (res.code !== code) {
              return new Response(
                JSON.stringify({ message: "incorrect verification code" }),
                {
                  status: 400,
                }
              );
      } 
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
    
        return new Response(
          JSON.stringify({ message: "user does not exist" }),
          {
            status: 404,
          }
        );
      
    }
      
      const update = await prisma.user.update({ where: { email: email },data:{email_verified:true} })
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
      },
    });

    let html = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="padding: 20px 0;">
                <img src="http://localhost:3000/assets/logo.png" alt="Nexus" width="150" height="auto">
            </td>
        </tr>
    </table>
    
    <table width="100%" cellpadding="20" cellspacing="0" style="background-color: #fff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td>
                <h1 style="color: #333;">Congratulations!</h1>
                <p>Your email address has been successfully verified.</p>
         
                <p>Thank you for joining us on this exciting journey. We look forward to providing you with a great experience.</p>
                <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:[Your Support Email]" style="text-decoration: none; color: #0073e6;">support@nexus.com</a>.</p>
                <p>Welcome aboard!</p>
            </td>
        </tr>
    </table>
    
     <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="padding: 20px 0; text-align: center;">
                &copy; 2023 Nexus Classic. All rights reserved.
            </td>
        </tr>
    </table>
</div>`;

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "Nexus Classic <femmyd4@zohomail.com>", // sender address
      to: body.email, // list of receivers
      subject: "Email Verification", // Subject line

      // plain text body
      html: html, // html body
    });

            if (info.accepted) {
                return new Response( JSON.stringify({message:"success"}), {status:200})
    }
    
} catch (error) {
    if (error instanceof TokenExpiredError) {
          
              return new Response(
                JSON.stringify({ message: "token has expired. " }),
                {
                  status: 400,
                }
              );
      }
  }
};