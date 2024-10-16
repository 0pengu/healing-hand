## Getting Started

## Development

### Prerequisites
- A Postgres database (on Mac, you can use [Postgres.app](https://postgresapp.com/))
- Pnpm (install with `npm install -g pnpm`) (this is optional, you can use npm or yarn if you prefer, but my preference is pnpm)
- Dbeaver (this is optional, but it's a good GUI for managing databases but you can use whatever you want to view the database data) 

### Environment Variables

Two options for setting up environment variables:

1. You can simply pull the `.env` file from the dotenv.org configuartion. Simply run the following command in the root of the project:

    ```bash
    pnpm run env:pull
    ```

    And follow the on-screen instructions.
    _
2. If you don't have access to the dotenv.org configuration (likely because you forked the repo), you can create your own `.env` file. There is a `.env.example` file in the root of the project. You should copy this file to `.env` and fill in the values.

## Database Setup

First, you need to create a database. You can just run this command in the terminal:

```bash
createdb -h localhost -p 5432 -U postgres healinghand
```

while will create a local Postgres database called `healinghand`.

Then, you need to push the Prisma schema to the database:

```bash
pnpm run db:push
```

This will create the tables in the database.

If you ever change the Prisma schema, you will need to run the following command to update the database
and store the changes in the migrations folder:

```bash
pnpm run db:migrate
```

Then, you need to run the migrations:

```bash

## Running the Development Server

First, you need to install the dependencies:

```bash
pnpm install
```

Then, you can run the development server:

```bash
pnpm run dev
```

you can attempt to run with Turbopack (faster hot reloading), but it may break at any time:

```bash
pnpm run dev --turbo
```

## Environment 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployments

Automatically handled through Vercel, just push to the `main` branch.

Again, if you forked this repository, you will need to set up your own Vercel account and link it to your repository, or setup your own deployment pipeline.