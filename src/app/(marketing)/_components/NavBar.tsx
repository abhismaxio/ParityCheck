import { BrandLogo } from "@/components/BrandLogo";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar(){
    return<header className="flex py-6 shadow-xl fixed top-0 w-full z-10 bg-background/95 ">
        <nav className="flex items-center gap-10 font-semibold">
            <Link href="/" className="mr-auto"> <BrandLogo/> </Link>
            <Link href="#" className="text-lg"> Feature</Link>
            <Link href="/#Pricing" className="text-lg"> Pricing</Link>
            <Link href="#" className="text-lg"> About</Link>
            <span className="text-lg">
                <SignedIn>
                    <Link href='' >DashBoard</Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton>Login</SignInButton>
                </SignedOut>
            </span>
        </nav>
    </header>
}