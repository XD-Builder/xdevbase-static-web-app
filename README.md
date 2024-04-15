This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
### Prerequisites
1. [Install supabase cli](https://supabase.com/docs/guides/cli/getting-started)
2. [Download docker](https://www.docker.com/products/docker-desktop/)
3. [Install pnpm](https://pnpm.io/installation). If using brew, simply run `brew install pnpm`
4. Start docker and then start supabase instance, by running `supabase start`. Note the output.
5. Add an .env.local file to include the variable mapping from the previous output
```sh
# This is the api url
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321

# These are mapped to their respective variables 
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
```
6. Follow the [Supabase local development guide](https://supabase.com/docs/guides/cli/local-development) for more information.

### Up and running
First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Register your email and log in to the home page. Go back to the terminal and verify if you're receiving query for auth.getProfile. If so, it means that your front and backend api integration is working as expected. You're well on your way to start your development journey.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!