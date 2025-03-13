import Link from "next/link";
import { Button } from "../Button";
import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { Logo } from "../icons/Logo";

export const Header = () => {
  const { userId } = useAuth();
  return (
    <header className="px-6 py-4 bg-white bg-opacity-55 backdrop-blur-[30px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 flex items-center justify-between md:px-12 md:py-6">
      <div className="flex gap-6 items-center">
        <Link href="/" className="flex items-center gap-4">
          {/* logo here */}
          <Logo />
          <h1 className="text-3xl font-bold">EthicCheck</h1>
        </Link>

        <ul className="flex gap-4">
          <Link href="/services">
            <li>Services</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <SignedIn>
            <Link href="/requests-history">
              <li>Requests history</li>
            </Link>
          </SignedIn>
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />
        </SignedIn>
      </div>
    </header>
  );
};
