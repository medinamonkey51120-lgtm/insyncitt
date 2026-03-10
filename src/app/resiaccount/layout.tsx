"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, User, LogOut, Bell, Search, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiAssistant } from "@/components/AiAssistant";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser, useDoc, useMemoFirebase, useAuth, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const menuItems = [
  { name: "My Dashboard", href: "/resiaccount/dashboard", icon: LayoutDashboard },
  { name: "Friendly Help", href: "/resiaccount/support", icon: Heart },
  { name: "My Profile", href: "/resiaccount/profile", icon: User },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const logo = PlaceHolderImages.find(img => img.id === 'app-logo');

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "users", user.uid);
  }, [user, firestore]);

  const { data: profile } = useDoc(userProfileRef);

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };

  const initials = profile 
    ? `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase() 
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-muted/50">
          <SidebarHeader className="p-10">
            <div className="flex items-center gap-4">
              {logo && <Image src={logo.imageUrl} alt="InSync IT" width={48} height={48} className="rounded-xl shadow-sm" />}
              <span className="text-3xl font-bold font-headline tracking-tighter">
                <span className="text-black">InSync</span> <span className="text-primary font-bold">IT</span>
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-6">
            <SidebarMenu className="gap-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "flex items-center gap-5 px-6 py-10 rounded-[2rem] transition-all",
                      pathname === item.href 
                        ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <a href={item.href}>
                      <item.icon className="w-7 h-7" />
                      <span className="font-bold text-xl">{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-8 border-t border-muted/50">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleSignOut}
                  className="hover:bg-destructive/10 hover:text-destructive py-8 px-6 rounded-2xl transition-colors"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="font-bold text-lg">Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="h-28 border-b border-muted/50 flex items-center justify-between px-12 bg-background sticky top-0 z-30">
            <div className="flex items-center gap-8">
              <SidebarTrigger className="h-12 w-12" />
              <div className="relative hidden md:block w-[400px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground/50" />
                <Input placeholder="Search for help..." className="pl-14 h-14 bg-muted/30 border-none rounded-full text-lg font-medium" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <Button variant="ghost" size="icon" className="relative h-14 w-14 rounded-full hover:bg-muted">
                <Bell className="w-7 h-7" />
                <span className="absolute top-4 right-4 w-4 h-4 bg-accent rounded-full border-4 border-background" />
              </Button>
              <div className="flex items-center gap-5 pl-8 border-l border-muted/50 ml-2">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xl font-bold text-foreground">
                    {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : 'Household User'}
                  </span>
                  <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Personal Portal</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-xl shadow-primary/20">
                  {initials}
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-12 overflow-y-auto bg-[#fafafa]">
            {children}
          </main>
        </SidebarInset>
      </div>
      <AiAssistant />
    </SidebarProvider>
  );
}
