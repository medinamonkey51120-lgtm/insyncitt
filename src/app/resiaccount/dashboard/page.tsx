"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Shield, Plus, ArrowUpRight, MessageCircle, Laptop, Cloud, Wifi, Activity, Globe, Zap, Lock } from "lucide-react";
import Link from "next/link";
import { useUser, useDoc, useMemoFirebase, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "users", user.uid);
  }, [user, firestore]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const networkStats = [
    { name: "Connection Speed", value: "940 Mbps", status: "Optimal", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Active Devices", value: "8 Online", status: "Secure", icon: Laptop, color: "text-primary", bg: "bg-primary/5" },
    { name: "Data Protection", value: "Active", status: "Encrypted", icon: Lock, color: "text-green-500", bg: "bg-green-50" },
  ];

  const connectivityDetails = [
    { name: "Fiber Gateway Status", plan: "Gigabit Fiber", usage: 98, icon: Globe },
    { name: "Family Cloud Storage", plan: "5TB Shared", usage: 45, icon: Cloud },
    { name: "Network Firewall", plan: "Advanced Shield", usage: 100, icon: Shield },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold font-headline tracking-tight text-foreground">
            {isProfileLoading ? "Syncing..." : `Welcome home, ${profile?.firstName || 'Friend'}.`}
          </h1>
          <p className="text-2xl text-muted-foreground font-medium">Your household technology is healthy and secure.</p>
        </div>
        <Link href="/resiaccount/support">
          <Button className="h-20 px-12 rounded-2xl gap-4 shadow-2xl shadow-primary/20 text-2xl font-bold bg-primary hover:bg-primary/90 transition-transform active:scale-95">
            <Plus className="w-8 h-8" /> Request Friendly Help
          </Button>
        </Link>
      </div>

      {/* Primary Network Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {networkStats.map((stat, i) => (
          <Card key={i} className="border-none shadow-none bg-white rounded-[3rem] group transition-all hover:bg-muted/10">
            <CardContent className="p-12">
              <div className="flex items-center justify-between mb-10">
                <div className={`p-6 rounded-[2rem] ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                  <stat.icon className="w-12 h-12" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 px-5 py-2 text-sm font-bold rounded-full uppercase tracking-widest border-none">
                  {stat.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-[0.25em]">{stat.name}</h3>
                <p className="text-5xl font-bold font-headline tracking-tighter">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Control Grid */}
      <div className="grid lg:grid-cols-5 gap-10">
        <Card className="lg:col-span-3 border-none shadow-none rounded-[3.5rem] bg-white">
          <CardHeader className="p-16 pb-10">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <CardTitle className="font-headline text-4xl font-bold">Household Connectivity</CardTitle>
                <CardDescription className="text-xl font-medium">Real-time gateway status and system health</CardDescription>
              </div>
              <Wifi className="w-10 h-10 text-primary opacity-20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-16 p-16 pt-0">
            {connectivityDetails.map((service, i) => (
              <div key={i} className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-muted/40 rounded-2xl">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-2xl">{service.name}</span>
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-[0.2em]">{service.plan}</span>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-primary font-headline">{service.usage}%</span>
                </div>
                <Progress value={service.usage} className="h-5 bg-muted/30 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-2xl flex flex-col bg-primary text-primary-foreground rounded-[3.5rem] overflow-hidden">
          <CardHeader className="p-12 pb-6">
            <CardTitle className="font-headline text-4xl font-bold">AI Support Agent</CardTitle>
            <CardDescription className="text-primary-foreground/70 text-xl leading-relaxed mt-4">
              Need a quick answer about your iPad, Wi-Fi, or Smart Home? I'm here 24/7.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center text-center p-12 gap-10">
            <div className="w-40 h-40 rounded-[2.5rem] bg-white/10 flex items-center justify-center border border-white/10 shadow-inner">
              <MessageCircle className="w-20 h-20 text-accent" />
            </div>
            <p className="font-medium text-2xl leading-relaxed italic opacity-90 max-w-sm">
              &ldquo;How do I share my Wi-Fi password with guests safely?&rdquo;
            </p>
            <Button className="w-full bg-accent hover:bg-accent/90 text-primary-foreground font-bold h-20 text-2xl rounded-2xl shadow-2xl shadow-accent/30 transition-all hover:scale-[1.02]">
              Start Chatting
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent History Table */}
      <Card className="border-none shadow-none rounded-[3.5rem] bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-16">
          <div className="space-y-2">
            <CardTitle className="font-headline text-4xl font-bold">Recent Friendly Help</CardTitle>
            <CardDescription className="text-xl">Tracking your latest household tech requests</CardDescription>
          </div>
          <Link href="/resiaccount/support">
            <Button variant="outline" className="font-bold border-2 rounded-2xl h-16 px-10 text-lg hover:bg-muted">
              View History
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30 border-none">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="pl-16 h-20 font-bold text-foreground text-sm uppercase tracking-[0.2em]">ID</TableHead>
                <TableHead className="h-20 font-bold text-foreground text-sm uppercase tracking-[0.2em]">Request Topic</TableHead>
                <TableHead className="h-20 font-bold text-foreground text-sm uppercase tracking-[0.2em]">Current Status</TableHead>
                <TableHead className="h-20 font-bold text-foreground text-sm uppercase tracking-[0.2em]">Service Level</TableHead>
                <TableHead className="pr-16 text-right h-20 font-bold text-foreground text-sm uppercase tracking-[0.2em]">Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/10 h-32 border-none transition-colors">
                <TableCell className="font-mono text-sm font-bold pl-16 text-primary">HL-105</TableCell>
                <TableCell className="font-bold text-2xl">New Family iPad Configuration</TableCell>
                <TableCell>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none rounded-full px-5 py-2 font-bold uppercase text-xs tracking-widest">
                    In Progress
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">Friendly Visit</span>
                </TableCell>
                <TableCell className="pr-16 text-right text-muted-foreground font-medium text-xl">15m ago</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/10 h-32 border-none transition-colors">
                <TableCell className="font-mono text-sm font-bold pl-16 text-primary">HL-098</TableCell>
                <TableCell className="font-bold text-2xl">Bedroom Wi-Fi Expansion</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground rounded-full px-5 py-2 font-bold uppercase text-xs tracking-widest border-none">
                    Resolved
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">Quick Fix</span>
                </TableCell>
                <TableCell className="pr-16 text-right text-muted-foreground font-medium text-xl">1d ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
