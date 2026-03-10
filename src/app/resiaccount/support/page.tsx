"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Ticket, LifeBuoy, Send, Paperclip, MessageSquare, Laptop, Smartphone, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Help Request Received",
        description: "We've received your request! A friendly helper will contact you shortly.",
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/resiaccount/dashboard">
          <Button variant="ghost" size="sm" className="font-bold">← Back to Dashboard</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Friendly Support Center</h1>
        <p className="text-muted-foreground">Ask a question or request a home visit for tech help.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-lg rounded-[2.5rem]">
            <CardHeader className="p-10 pb-6">
              <CardTitle className="text-3xl font-headline flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" /> What can we help with?
              </CardTitle>
              <CardDescription className="text-lg">Tell us in your own words what technology you need help with today.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-lg font-bold">Topic</Label>
                    <Select required>
                      <SelectTrigger className="h-14 rounded-xl text-lg border-2">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone / Tablet Help</SelectItem>
                        <SelectItem value="computer">Computer / Laptop Help</SelectItem>
                        <SelectItem value="internet">Internet / Wi-Fi Help</SelectItem>
                        <SelectItem value="security">Safety / Scams Help</SelectItem>
                        <SelectItem value="photos">Photos / Digital Memories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="priority" className="text-lg font-bold">How urgent is it?</Label>
                    <Select required>
                      <SelectTrigger className="h-14 rounded-xl text-lg border-2">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">No rush, just curious</SelectItem>
                        <SelectItem value="med">Need help this week</SelectItem>
                        <SelectItem value="high">Need help right away</SelectItem>
                        <SelectItem value="visit">I'd like a home visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-lg font-bold">Short Summary</Label>
                  <Input id="subject" placeholder="e.g. My iPad screen is too dark" className="h-14 rounded-xl text-lg border-2" required />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-lg font-bold">Tell us more</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe what's happening. No detail is too small!" 
                    className="min-h-[180px] rounded-xl text-lg border-2 p-6"
                    required
                  />
                </div>

                <div className="p-8 border-2 border-dashed rounded-[1.5rem] flex flex-col items-center gap-3 text-muted-foreground bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                  <Paperclip className="w-8 h-8 group-hover:text-primary transition-colors" />
                  <span className="text-lg font-bold">Attach a photo of the problem (Optional)</span>
                </div>

                <Button type="submit" className="w-full h-16 text-xl font-bold rounded-2xl gap-3 shadow-xl shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <><Send className="w-6 h-6" /> Send for Help</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground rounded-[2rem]">
            <CardHeader className="p-8">
              <CardTitle className="font-headline text-2xl">Ask Our Helper First</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8 pt-0">
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Our friendly AI Helper can answer most simple tech questions instantly. Give it a try!
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90 text-primary-foreground font-bold h-14 text-lg rounded-xl">
                Start Chatting
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-headline">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { id: "HL-102", title: "iPad Setup", status: "Helping" },
                  { id: "HL-105", title: "Cloud Photos", status: "Open" }
                ].map((t) => (
                  <div key={t.id} className="p-6 hover:bg-muted/50 transition-colors flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">{t.id}</span>
                      <span className="text-xs px-3 py-1 bg-muted rounded-full font-bold uppercase">{t.status}</span>
                    </div>
                    <span className="text-lg font-bold truncate">{t.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="p-8 bg-accent/10 rounded-[2rem] border border-accent/20 flex items-center gap-6">
            <div className="p-3 bg-accent/20 rounded-xl">
              <Smartphone className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Quick Help Active</h4>
              <p className="text-sm text-muted-foreground font-medium">We usually respond in 15 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
