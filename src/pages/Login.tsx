import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const user = authService.login(email, password);
      if (user.role === "admin") {
        toast({ title: "Welcome back, Admin!" });
        navigate("/admin/events");
      } else if (!user.profileCompleted) {
        toast({ title: "Profile incomplete", description: "Please complete your profile before booking venues." });
        navigate("/profile");
      } else {
        toast({ title: "Welcome back!" });
        navigate("/venues");
      }
    } catch (error) {
      const description = error instanceof Error ? error.message : "Please check your credentials and try again.";
      setAuthError(description);
      toast({
        title: "Sign in failed",
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
          <CardTitle className="font-heading text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => {
                setEmail(e.target.value);
                if (authError) setAuthError("");
              }} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => {
                  setPassword(e.target.value);
                  if (authError) setAuthError("");
                }} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {authError && <p className="text-sm text-destructive">{authError}</p>}
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0">Sign In</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Use the same email and password you registered with.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
