import { BrandLogo } from "@/components/BrandLogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar(){
    return (
        <header className="flex py-4 shadow bg-background">
            <nav className="flex items-center gap-10 container">
                <Link className="mr-auto" href="/"> 
                    <BrandLogo/>
                </Link>
                <Link href="/dashboard/products">Product</Link>
                <Link href="/dashboard/analytics">Analytics</Link>
                <Link href="/dashboard/subscription">Subscriptions</Link>
                <UserButton/>
            </nav>
        </header>
    )
}