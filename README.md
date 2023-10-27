This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup
Run the following commands to start this app.
```bash
npm install 
```
- create a file called `.env.local`

- create the follow environment variables

```bash
EMAIL_USERNAME
EMAIL_PASS 
EMAIL_TOKEN_CODE 
JWT_SECRET_KEY
JWT_EXPIRES_IN

```
 - EMAIL_USERNAME should be your smtp email username, EMAIL_PASS should be your smtp email password, EMAIL_TOKEN_CODE is a random string,  JWT_SECRET_KEY should be a random string, JWT_EXPIRES_IN should be the expiry time e.g. 10 which means 10 seconds

 
 # INSTALL MYSQL
- install a mysql server either with xammp or any other means
- create a database inside the mysql called "nexus" or any other name
-  open .env and change the DATABASE_URL  to your database url. it should follow this e.g "mysql://<username>:<password>@localhost:3306/nexus"

# PRISMA INSTALLATION
 run the following command to create tables.

 ```bash
 npx prisma migrate dev
 npx prisma generate
 ```


## Getting Started



run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
