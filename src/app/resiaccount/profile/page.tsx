
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Bell, Shield, Key, Smartphone } from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and communication preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* Personal Info */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Personal Information
            </CardTitle>
            <CardDescription>Update your basic contact details used for support communication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6 pb-6">
              <Avatar className="w-20 h-20 border-4 border-background shadow-md">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">AR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">Change Avatar</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Alex" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Rivers" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="alex.rivers@techcorp.com" disabled />
                <p className="text-xs text-muted-foreground">Email changes require admin approval.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 0123-456" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button onClick={handleSave} disabled={isLoading} className="ml-auto px-8 font-bold">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        {/* Preferences */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> Notification Preferences
            </CardTitle>
            <CardDescription>Control how and when you receive updates from InSync Connect.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Support Ticket Activity</Label>
                <p className="text-sm text-muted-foreground">Get notified when a technician comments or updates your ticket.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">System Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts about scheduled downtime for your infrastructure.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Marketing & Newsletters</Label>
                <p className="text-sm text-muted-foreground">Occasional updates about new services and tech insights.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Security
            </CardTitle>
            <CardDescription>Secure your account with multi-factor authentication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-background rounded-lg">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Password</h4>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-background rounded-lg">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Two-Factor Auth (2FA)</h4>
                  <p className="text-sm text-muted-foreground">SMS verification is currently active</p>
                </div>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
