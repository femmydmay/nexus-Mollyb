export interface User{
    id: string
    firstname: string
    lastname: string
    username:string
    email: string
    email_verified: boolean
    role: string,
    whatsapp_no?: string,
    alternate_email?: string,
    image?: string
    phone_no?: string
}