import { useState } from "react";
import { authService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const user = authService.getCurrentUser();
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Complete all fields",
        description: "Please provide first name, last name, email, and phone.",
        variant: "destructive",
      });
      return;
    }

    try {
      authService.updateProfile({
        name: `${firstName.trim()} ${lastName.trim()}`,
        email,
        phone,
      });
      toast({ title: "Profile updated!", description: "You can now browse venues and make bookings." });
    } catch (error) {
      toast({
        title: "Unable to update profile",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>

      <Card className="elevated-card bg-card/95">
        <CardHeader>
          <CardTitle className="font-heading">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xl font-heading">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-heading font-semibold">{firstName} {lastName}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <Button className="gradient-primary text-primary-foreground border-0" onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="elevated-card bg-card/95">
        <CardHeader>
          <CardTitle className="font-heading">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Current Password</Label><Input type="password" autoComplete="current-password" placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>New Password</Label><Input type="password" autoComplete="new-password" placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" autoComplete="new-password" placeholder="••••••••" /></div>
          <Button variant="outline" onClick={() => toast({ title: "Password updated!" })}>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
