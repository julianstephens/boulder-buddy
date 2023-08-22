import { signIn, signOut, useSession } from "next-auth/react";

type Props = {
  className?: string;
};

export const AuthButton = ({ className }: Props) => {
  const { status } = useSession();
  const isAuthed = () => status === "authenticated"

  return (
    <button
      className={`btn ${className}`}
      onClick={
        isAuthed()
          ? () => void signOut()
          : () => void signIn(undefined, { callbackUrl: "/dashboard" })
      }
    >
      {isAuthed() ? "Sign out" : "Sign in"}
    </button>
  );
};
