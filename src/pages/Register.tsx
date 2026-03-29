import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    try {
      authService.register(name, email, password);
      toast({ title: "Account created!", description: "Complete your profile to start booking venues." });
      navigate("/profile");
    } catch (error) {
      const description = error instanceof Error ? error.message : "Please try again.";
      setRegisterError(description);
      toast({
        title: "Registration failed",
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold">EventZen</span>
          </Link>
          <CardTitle className="font-heading text-2xl">Create account</CardTitle>
          <CardDescription>Get started with EventZen</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={e => {
                setName(e.target.value);
                if (registerError) setRegisterError("");
              }} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => {
                setEmail(e.target.value);
                if (registerError) setRegisterError("");
              }} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => {
                setPassword(e.target.value);
                if (registerError) setRegisterError("");
              }} required />
            </div>
            {registerError && <p className="text-sm text-destructive">{registerError}</p>}
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0">Create Account</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
