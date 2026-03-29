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
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "John");
  const [lastName, setLastName] = useState(user?.name?.split(" ")[1] || "Doe");
  const [email, setEmail] = useState(user?.email || "john@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  const handleSave = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const updated = { ...currentUser, name: `${firstName} ${lastName}`, email };
      localStorage.setItem("eventzen_user", JSON.stringify(updated));
    }
    toast({ title: "Profile updated!" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>

      <Card>
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
              <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
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

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" placeholder="••••••••" /></div>
          <Button variant="outline" onClick={() => toast({ title: "Password updated!" })}>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
