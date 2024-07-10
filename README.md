# Moto Moto


- **A Driving lessons booking web-app**

<img src="/opengraph.png" alt="opengraph" >

## Tech-Stack Used
- Next.js as the React framework
- Prisma as the ORM for migrations and database access
- PostgreSQL: database for local testing
- Next-Auth/Authjs: for authentication
- TypeScript: the programming language
- TailwindCSS: Styling
- Shadcn/ui for UI components

## Set Up
- Clone the repo `https://github.com/de-mawo/spana-yt.git `
- Install packages `npm install ` in your terminal
- Create a *.env file* on the root of your project directory.See the *.env.example * file for all variables required
- Set up your Postgresql database either locally of cloud-based (Neon, Vercel or Supabase)
- Run `npx prisma migrate dev ` to sync your schema with your database, 
- Start the app locally by running `npm run dev` 


## Future Updates & Refactoring

- Refactor the Admin, Instructor & User Dashboard Layout to be a re-usable component
- Add a cron-job to delete expired timeslots
- Send an email notification to a USER when a lesson is about to start.
- Add DashBoard Charts & Settings
- Export Dashboard Data into CSV

## Bugs

- Remove timeslots which have already been added to a booking **URGENT**
