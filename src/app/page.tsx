import { PublicNavbar } from "@/components/PublicNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AiAssistant } from "@/components/AiAssistant";
import { ArrowRight, ShieldCheck, MessageSquare, Zap, CheckCircle2, Lock, Smartphone, Share2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const syncServices = [
  {
    title: "Quick Sync",
    tagline: "For Quick Fixes",
    description: "Perfect for single issues like setting up a new device, fixing a printer, or sorting out one tricky app. Fast, friendly, and effective.",
    icon: Zap,
    image: PlaceHolderImages.find(i => i.id === 'service-support')?.imageUrl
  },
  {
    title: "More Sync",
    tagline: "In-Depth Work",
    description: "For more complex needs like securing your home network, setting up family sharing, or organizing years of digital memories.",
    icon: MessageSquare,
    image: PlaceHolderImages.find(i => i.id === 'service-security')?.imageUrl
  },
  {
    title: "Max Sync",
    tagline: "Harder Jobs",
    description: "Complete household tech overhaul. Data recovery, multi-device syncing, and total protection for your family's digital life.",
    icon: ShieldCheck,
    image: PlaceHolderImages.find(i => i.id === 'service-cloud')?.imageUrl
  }
];

const reviews = [
  { name: "Margaret H.", comment: "InSync IT was so patient with me. They explained how my tablet works without making me feel overwhelmed.", rating: 5 },
  { name: "Robert D.", comment: "My Wi-Fi finally works in every room! They were quick, polite, and very professional.", rating: 5 },
  { name: "Linda S.", comment: "I finally feel safe browsing the internet. The security they set up is so easy to use.", rating: 5 }
];

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight text-foreground">
              Technology Made <span className="text-primary">Simple & Friendly</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              InSync IT helps you navigate your digital life with confidence. From setting up your new iPad to keeping your home network secure, we're here for you.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/content/dam/exoauth.cust/login/onsuccessfulauth?redirectto=dashboard">
                <Button size="lg" className="h-16 px-10 text-xl gap-3 rounded-2xl shadow-xl shadow-primary/20">
                  Join the Community <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-2xl">
                See How We Help
              </Button>
            </div>
          </div>
          <div className="relative h-[550px] w-full hidden lg:block rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
            {heroImg && (
              <Image 
                src={heroImg.imageUrl} 
                alt="Family using technology" 
                fill 
                className="object-cover"
                data-ai-hint="happy family technology"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/40 border-y">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-10 text-muted-foreground uppercase tracking-widest">Reliable Support for Your Home</h3>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
            <div className="flex items-center gap-2 text-2xl font-bold"><CheckCircle2 className="text-primary" /> EASY SETUP</div>
            <div className="flex items-center gap-2 text-2xl font-bold"><CheckCircle2 className="text-primary" /> CYBER SECURE</div>
            <div className="flex items-center gap-2 text-2xl font-bold"><CheckCircle2 className="text-primary" /> FAMILY CARE</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20 gap-6">
            <h2 className="text-4xl md:text-6xl font-bold font-headline">Find Your Perfect Sync</h2>
            <div className="h-2 w-32 bg-accent rounded-full" />
            <p className="max-w-3xl text-muted-foreground text-xl md:text-2xl">
              We focus on the things that matter most to you: staying connected with loved ones, staying safe online, and making your devices work perfectly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {syncServices.map((service, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-none bg-muted/30 rounded-[2.5rem]">
                <div className="h-56 relative overflow-hidden">
                  {service.image && (
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    {service.tagline}
                  </div>
                </div>
                <CardHeader className="pt-8">
                  <div className="p-4 bg-primary/10 w-fit rounded-2xl mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-3xl mb-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">{service.description}</p>
                  <Button variant="link" className="px-0 mt-8 text-primary text-lg font-bold group-hover:gap-3 transition-all">
                    Tell me more <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">What Our Community Says</h2>
            <p className="text-xl text-muted-foreground">Trusted by families all over the neighborhood.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <Card key={i} className="p-10 rounded-[2rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xl italic text-foreground/80 mb-8 leading-relaxed">"{review.comment}"</p>
                <div className="font-bold text-primary">— {review.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-primary text-primary-foreground rounded-[4rem] mx-4 md:mx-8 mb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-5xl md:text-6xl font-bold font-headline leading-tight">
                Patience, Clarity, <br /> & Personal Care
              </h2>
              <div className="space-y-10 mt-6">
                {[
                  { title: "One-on-One Guidance", desc: "We don't just fix it; we show you how it works at your own pace.", icon: Smartphone },
                  { title: "Home Network Safety", desc: "Protect your personal information with simple, effective security tools.", icon: Lock },
                  { title: "Photo & Video Help", desc: "Learn how to share and preserve your most precious digital memories.", icon: Share2 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="p-4 bg-white/10 rounded-2xl h-fit border border-white/10">
                      <item.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                      <p className="text-primary-foreground/80 text-lg md:text-xl">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-[3rem] p-12 border border-white/10 text-center">
              <div className="text-8xl font-headline font-bold text-accent mb-4">100%</div>
              <p className="text-2xl font-medium mb-8">Patience Guarantee</p>
              <p className="text-xl text-primary-foreground/70 leading-relaxed">
                We believe everyone should feel confident with their devices. We take the time needed to make sure you're comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-accent/10 rounded-[4rem] p-16 border border-accent/20 flex flex-col items-center text-center gap-10">
            <h2 className="text-5xl font-bold font-headline">Ready to feel confident with your tech?</h2>
            <p className="text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Whether you need help setting up a new tablet or want to secure your home Wi-Fi, our friendly experts are ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Button size="lg" className="h-20 px-12 text-2xl font-bold rounded-2xl shadow-lg">Request a Friendly Visit</Button>
              <Button size="lg" variant="outline" className="h-20 px-12 text-2xl font-bold rounded-2xl">Give Us a Call</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t bg-muted/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-headline tracking-tight">
              <span className="text-black">InSync</span> <span className="text-primary">IT</span>
            </span>
          </div>
          <div className="text-lg text-muted-foreground font-medium">
            © 2024 InSync IT. Helping families stay connected.
          </div>
          <div className="flex gap-10 text-lg font-bold text-primary">
            <Link href="#" className="hover:underline">Safety Tips</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Help Center</Link>
          </div>
        </div>
      </footer>

      <AiAssistant />
    </div>
  );
}
