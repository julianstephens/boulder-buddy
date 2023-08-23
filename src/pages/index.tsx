import { AuthButton } from "@/components/AuthButton";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Boulder Buddy</title>
        <meta name="description" content="The training app for boulderers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="col h-full w-full justify-start">
        <div className="col mt-56 w-full gap-16">
          <h1>Welcome to Boulder Buddy!</h1>
          <AuthButton className="w-2/6" />
        </div>
      </main>
    </>
  );
}
