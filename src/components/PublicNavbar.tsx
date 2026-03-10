"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser, useDoc, useMemoFirebase, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";

const navLinks = [
  { name: "Our Services", href: "/#services" },
  { name: "Why InSync", href: "/#why-us" },
  { name: "Get Help", href: "/#contact" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const firestore = useFirestore();
  const logo = PlaceHolderImages.find(img => img.id === 'app-logo');

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "users", user.uid);
  }, [user, firestore]);

  const { data: profile } = useDoc(userProfileRef);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-28 items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-4 group">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt="InSync IT Logo"
              width={56}
              height={56}
              className="rounded-none object-contain shadow-sm border border-white transition-transform group-hover:scale-105"
              priority
            />
          )}
          <span className="text-3xl font-bold font-headline tracking-tighter">
            <span className="text-black">InSync</span> <span className="text-primary font-bold">IT</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-bold transition-colors hover:text-primary relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <Link href="/resiaccount/dashboard">
              <Button variant="ghost" className="text-xl font-bold flex items-center gap-3 px-6 h-14 hover:bg-primary/5 rounded-xl border-2 border-transparent hover:border-primary/20 transition-all">
                Hello, {profile?.firstName || user.email?.split('@')[0]} <span className="text-primary text-2xl">→</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/content/dam/exoauth.cust/login/onsuccessfulauth?redirectto=dashboard">
                <Button variant="ghost" className="hidden sm:inline-flex text-lg font-bold hover:bg-muted rounded-xl h-14 px-8">Sign In</Button>
              </Link>
              <Link href="/content/dam/exoauth.cust/login/onsuccessfulauth?redirectto=dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-lg font-bold h-14 px-10 rounded-xl shadow-2xl shadow-primary/20 transition-transform active:scale-95">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
