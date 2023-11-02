
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { generateRandomCode } from "@/utils/randomCode";
import prisma from "@/utils/database";
import { getErrorResponse } from "@/lib/helpers";
export const POST = async (req: Request,) => { 
    try {
        const body = await req.json()

               const userId = req.headers.get("X-USER-ID");
            
               if (!userId) {
                 return getErrorResponse(
                   401,
                   "You are not logged in, please provide token to gain access"
                 );
               }

        const { email } = body

        const user = await prisma.user.findFirst({ where: { email: email } })
        if (!user) {
   
      return new Response(JSON.stringify({ message: "user does not exist" }), {
        status: 404,
      });
    
         }
        const transporter = nodemailer.createTransport({
          host: "smtp.zoho.com",
          port: 465,
          secure: true,
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASS,
          },
        });

        const randomCode = generateRandomCode(8)
const access = process.env.EMAIL_TOKEN_CODE as string; 
        const token =  jwt.sign({code:randomCode}, access, {expiresIn: '30m'}, )

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
                <h1 style="color: #333;">Your Verification Code</h1>
                <p>Hello ${user?.firstname} </p>
                <p>Your verification code is: </p>
                <h2 style="color: #0073e6;">${randomCode}</h2>
                <p>Please visit our website by clicking the link below and enter the code to complete your registration:</p>
                <p><a href="http://localhost:3000/api/users/email/verify/${token}" style="text-decoration: none; color: #0073e6;">Verify Your Account</a></p>
                <p>If you didn't initiate this verification or have any questions, please contact our support team at <a href="mailto:[Your Support Email]" style="text-decoration: none; color: #0073e6;">support@nexus.com</a>.</p>
                <p>Thank you for choosing Nexus</p>
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
        // async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: "Nexus MollyBW <femmyd4@zohomail.com>", // sender address
              to: body.email, // list of receivers
              subject: "Email confirmation", // Subject line
              text: "Hello world?",
              // plain text body
              html: html, // html body
            });

        if (info.accepted) {
            return new Response( JSON.stringify({message:"success", token}), {status:200})
}
        // }
        
    } catch (error) {
  
            return new Response(JSON.stringify({ message: "Internal server error",  }), {
              status: 500,
            });
    }
}