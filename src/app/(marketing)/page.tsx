import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon} from "lucide-react";
import { NeonIcon } from "./_icons/Neon";
import { ClerkIcon } from "./_icons/Clerk";
import { subscriptionTierInOrder } from "@/data/subscriptionTiers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/formatters";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import Link from "next/link";
export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-10xl font-bold tracking-tight m-4">Price Smarter ,Sell Bigger</h1>
        <p className="text-lg lg:text-3lg max-w-screen-xl ">Were glad to have you here! Optimise your product pricing across countires to maximise sale. Capture 86% mark with location based dynamic pricing</p>
        <SignUpButton>
          <Button className="text-lg p-6 rounded-xl flex gap-2">
            Get Started for free <ArrowRightIcon className="size-5"/>
          </Button>
        </SignUpButton>
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="container py-8 flex flex-col gap-18 px-8 md:px-16">
        <h2 className="text-3xl text-center text-balance mb-10 "> trusted  by top modern companies</h2>
        <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
          <Link href="https://neon.texh"> <NeonIcon/> </Link>
          <Link href="https://clerk.texh"> <ClerkIcon/> </Link>
          <Link href="https://neon.texh"> <NeonIcon/> </Link>
          <Link href="https://clerk.texh"> <ClerkIcon/> </Link>
          <Link href="https://neon.texh"> <NeonIcon/> </Link>
          <Link href="https://clerk.texh"> <ClerkIcon/> </Link>
          <Link href="https://neon.texh"> <NeonIcon/> </Link>
          <Link href="https://clerk.texh"> <ClerkIcon/> </Link>
          <Link href="https://neon.texh"> <NeonIcon/> </Link>
          <Link href="https://clerk.texh" className="md:max-xl:hidden"> <ClerkIcon/> </Link>
        </div>
        </div>
      </section>
      <section id="pricing" className="px-8 py-16 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-6"> pricing software pay for itself 20x over  </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
          {subscriptionTierInOrder.map(tier => (
            <PricingCard key ={tier.name} {...tier} />
          ))}
        </div>
      </section>
      <footer className=" container pt-16 pb-8 flex flex-col sm:flex-row gap-8 sm:gap-8 justify-between items-start">
          <Link href="/home" className="">
          <BrandLogo/>
          </Link>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className=" flex flex-col gap-8 ">
              <FooterLinkGroup 
                title="Help"
                links={[
                  {label: "ppp Discount", href: "#"},
                  {label:"discount api", href: "#"},
                  {label:"Add banner to site", href: "#"},
                  {label:"Contact", href: "#"},
                ]}
              />
              <FooterLinkGroup 
                title="Solutions"
                links={[
                  {label: "Newletter", href: "#"},
                  {label:"Saas Business", href: "#"},
                  {label:"online course ", href: "#"},
                  {label:"info products ", href: "#"},
                ]}
              />
            </div>
            <div className=" flex flex-col gap-8 ">
              <FooterLinkGroup 
                title="Feature"
                links={[
                  {label: "Holiday Discount", href: "#"},
                  {label:"Time Based Discount", href: "#"},
                  {label:"Benefits of geographic pricing", href: "#"},
                ]}
              />
              <FooterLinkGroup 
                title="Tools"
                links={[
                  {label: "Salary converter", href: "#"},
                  {label:"Coupen generator", href: "#"},
                  {label:"stripe app ", href: "#"},
                ]}
              />
            </div>
            <div className=" flex flex-col gap-8 ">
              <FooterLinkGroup 
                title="Company"
                links={[
                  {label: "Affiliate", href: "#"},
                  {label:"Twitter", href: "#"},
                  {label: "Terms of services", href: "#"},
                  {label:"Privacy", href: "#"},
                ]}
              />
              <FooterLinkGroup 
                title="Integration"
                links={[
                  {label: "Lemon Squeezy", href: "#"},
                  {label:"Gum Road", href: "#"},
                  {label:"Stripe ", href: "#"},
                  {label: "Whop", href: "#"},
                  {label:"Paddle", href: "#"},
                ]}
              />
            </div>
          </div>
      </footer>
    </>
  );
}

function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,

}:(typeof subscriptionTierInOrder)[number]){
  const isMostPopular = name === "Standard";
  return(
    <Card>
  <CardHeader>
    <div className="text-accent font-semibold mb-8">{name}</div>
    <CardTitle>${priceInCents/100}/mon</CardTitle>
    <CardDescription>{formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo</CardDescription>
  </CardHeader>
  <CardContent>
    <SignUpButton>
      <Button variant={isMostPopular?"accent":"default"}>Get Started</Button>
    </SignUpButton>
  </CardContent>
  <CardFooter className="flex flex-col gap-4 items-start">
    <Feature className="font-bold" > {maxNumberOfProducts}{" "} {maxNumberOfProducts===1?"product":"products"} </Feature> 
    <Feature> PPP Discount</Feature>
    {canAccessAnalytics && <Feature> Advance analytics</Feature>}
    {canCustomizeBanner && <Feature> Banner Customisation</Feature>}
    {canRemoveBranding && <Feature> Remove easy Branding</Feature>}
  </CardFooter>
</Card>
  )

}

function Feature ({children, className}:{children:ReactNode,className?:string}) {
  return<div className={cn("flex items-center gap-2", className)}> 
    <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
    <span>{children}</span>
  </div>
}

function FooterLinkGroup({title,links}:{title:string , links:{label:string; href:string}[]}){
return (
  <div className="flex flex-col gap-4">
    <h3 className="font-semibold"> {title} </h3>
    <ul>
      {links.map(link =>(
        <li key={link.label}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
)
}
