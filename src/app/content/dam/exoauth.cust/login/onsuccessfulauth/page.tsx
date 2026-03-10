"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Shield, LockOpen, UserPlus, LifeBuoy, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser, useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ViewState = "initial-check" | "email" | "password" | "authenticating" | "profile-setup";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  
  const [viewState, setViewState] = useState<ViewState>("initial-check");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Profile Setup State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const redirectPath = searchParams.get("redirectto") || "dashboard";
  const logo = PlaceHolderImages.find(img => img.id === 'app-logo');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !isUserLoading) setViewState("email");
    }, 1500);
    return () => clearTimeout(timer);
  }, [user, isUserLoading]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    async function checkProfile() {
      if (user && !isUserLoading && firestore && viewState !== "authenticating" && viewState !== "profile-setup") {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists() || !userSnap.data().firstName) {
          setViewState("profile-setup");
        } else {
          router.push(`/resiaccount/${redirectPath}`);
        }
      }
    }
    checkProfile();
  }, [user, isUserLoading, router, redirectPath, viewState, firestore]);

  const handleNextStep = (nextMode: "login" | "signup") => {
    if (isEmailValid) {
      setMode(nextMode);
      setViewState("password");
    }
  };

  const handleFinalAuth = async () => {
    if (!auth) return;
    setViewState("authenticating");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setViewState("password");
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Please check your details.",
      });
    }
  };

  const handleProfileSetup = async () => {
    if (!user || !firestore) return;
    setViewState("authenticating");
    
    try {
      const userRef = doc(firestore, "users", user.uid);
      
      const profileData = {
        id: user.uid,
        externalAuthId: user.uid,
        firstName,
        lastName,
        email: user.email, // STRICT: Use authenticated email
        phoneNumber,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      await setDoc(userRef, profileData, { merge: true });
      
      router.push(`/resiaccount/${redirectPath}`);
    } catch (error: any) {
      setViewState("profile-setup");
      toast({
        variant: "destructive",
        title: "Profile Setup Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-background p-8 md:p-16 lg:p-24">
      <Card className="w-full max-w-[700px] shadow-none border-none rounded-none bg-transparent text-left">
        {viewState === "initial-check" || viewState === "authenticating" ? (
          <div className="flex flex-col items-start justify-center p-0 min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-8" strokeWidth={3} />
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]">
              {viewState === "initial-check" ? "Establishing Secure Connection..." : "Verifying Details..."}
            </p>
          </div>
        ) : viewState === "profile-setup" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardHeader className="p-0 pb-12">
              <div className="flex items-center gap-4 mb-10">
                {logo && <Image src={logo.imageUrl} alt="InSync IT" width={72} height={72} className="rounded-none" />}
                <span className="text-4xl font-bold font-headline tracking-tighter">
                  <span className="text-black">InSync</span> <span className="text-primary">IT</span>
                </span>
              </div>
              <CardTitle className="text-4xl font-headline font-bold tracking-tight mb-4 text-foreground">Complete Your Profile</CardTitle>
              <CardDescription className="text-xl font-medium text-muted-foreground leading-relaxed max-w-xl">
                Welcome to your tech portal. Tell us who you are so we can provide personalized help.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[11px] font-bold text-foreground uppercase tracking-widest opacity-70">First Name</Label>
                  <Input 
                    placeholder="Alex" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-16 text-xl border-2 rounded-xl px-6 bg-muted/20 border-primary/5 focus:border-primary/20" 
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] font-bold text-foreground uppercase tracking-widest opacity-70">Last Name</Label>
                  <Input 
                    placeholder="Rivers" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-16 text-xl border-2 rounded-xl px-6 bg-muted/20 border-primary/5 focus:border-primary/20" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[11px] font-bold text-foreground uppercase tracking-widest opacity-70">Phone Number</Label>
                <Input 
                  placeholder="(555) 000-0000" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-16 text-xl border-2 rounded-xl px-6 bg-muted/20 border-primary/5 focus:border-primary/20" 
                />
              </div>
              <Button 
                onClick={handleProfileSetup}
                disabled={!firstName || !lastName || !phoneNumber}
                className="w-full h-16 text-xl font-bold rounded-2xl shadow-xl shadow-primary/10 gap-4"
              >
                Go to My Dashboard <ArrowRight className="w-6 h-6" />
              </Button>
            </CardContent>
          </div>
        ) : (
          <>
            <CardHeader className="space-y-8 p-0 pb-16 text-left items-start">
              <div className="flex items-center gap-4">
                {logo && <Image src={logo.imageUrl} alt="InSync IT" width={72} height={72} className="rounded-none" />}
                <span className="text-4xl font-bold font-headline tracking-tighter">
                  <span className="text-black">InSync</span> <span className="text-primary">IT</span>
                </span>
              </div>
              
              <div className="space-y-3 text-left">
                <CardTitle className="text-4xl font-headline font-bold tracking-tight text-foreground">
                  Personal Portal
                </CardTitle>
                <CardDescription className="text-xl font-medium text-muted-foreground leading-snug max-w-lg">
                  {viewState === "email" 
                    ? "Access your household technology and support services."
                    : mode === "login" 
                      ? "Enter your secure password to unlock your account."
                      : "Create a secure password to get started."
                  }
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 space-y-12">
              <div className="space-y-8 text-left w-full">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[11px] font-bold text-foreground uppercase tracking-widest opacity-70">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      disabled={viewState === "password"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "h-16 text-xl border-2 rounded-xl focus:ring-primary font-medium px-6 bg-muted/20 border-primary/5 transition-all focus:border-primary/20",
                        viewState === "password" && "italic text-muted-foreground bg-transparent border-transparent px-0 h-auto cursor-default font-bold"
                      )}
                    />
                    {viewState === "email" && isEmailValid && (
                      <Button
                        size="icon"
                        onClick={() => handleNextStep("login")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 animate-in fade-in zoom-in duration-300"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </Button>
                    )}
                  </div>
                </div>

                {viewState === "password" && (
                  <div className="space-y-3 animate-in slide-in-from-top-4 fade-in duration-500">
                    <Label htmlFor="password" className="text-[11px] font-bold text-foreground uppercase tracking-widest opacity-70">
                      {mode === "login" ? "Security Password" : "Create Password"}
                    </Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-16 text-xl border-2 rounded-xl focus:ring-primary font-medium px-6 bg-muted/20 border-primary/5 transition-all focus:border-primary/20"
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-6">
                {viewState === "email" ? (
                  <>
                    <Button 
                      onClick={() => handleNextStep("login")}
                      disabled={!isEmailValid}
                      className="w-full h-16 text-xl font-bold rounded-2xl shadow-xl shadow-primary/10 transition-all gap-4 justify-start px-8"
                    >
                      <LockOpen className="w-6 h-6" /> Unlock Account
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleNextStep("signup")}
                      disabled={!isEmailValid}
                      className="w-full h-16 text-xl font-bold rounded-2xl border-2 transition-all justify-start px-8 gap-4"
                    >
                      <UserPlus className="w-6 h-6 text-primary" /> First time Create an Account
                    </Button>

                    <Button 
                      variant="ghost"
                      onClick={() => toast({ title: "Help Requested", description: "Our team will contact you shortly." })}
                      className="w-full h-14 text-lg font-bold text-muted-foreground hover:text-primary transition-colors rounded-2xl justify-start px-8 gap-4"
                    >
                      <LifeBuoy className="w-6 h-6" /> Need Help?
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleFinalAuth}
                    className="w-full h-16 text-xl font-bold rounded-2xl shadow-xl shadow-primary/10 transition-all gap-4 justify-start px-8 animate-in fade-in duration-700"
                  >
                    {mode === "login" ? (
                      <><Check className="w-6 h-6" /> Secure Login</>
                    ) : (
                      <><UserPlus className="w-6 h-6" /> Create My Account</>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-0 pt-24 flex justify-start">
              <div className="flex items-center gap-3 px-5 py-3 bg-primary/5 rounded-xl border border-primary/10">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                  Secured by <span className="text-primary font-bold">InSync Security</span>
                </span>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-12 h-12 animate-spin text-primary" strokeWidth={4} /></div>}>
      <LoginForm />
    </Suspense>
  );
}
