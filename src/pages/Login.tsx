import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user"); // 'user', 'globalAdmin', 'orgAdmin'
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Attempting to log in as ${loginType} with`, { email, password });

    let isAuthenticated = false;
    let redirectPath = "/";

    if (loginType === "user") {
      if (email === "user@123" && password === "user123") {
        isAuthenticated = true;
        login("user");
        redirectPath = "/"; // Redirect to home or user dashboard
      }
    } else if (loginType === "globalAdmin") {
      if (email === "admin@123" && password === "admin123") {
        isAuthenticated = true;
        login("globalAdmin");
        redirectPath = "/admin"; // Redirect to global admin dashboard
      }
    } else if (loginType === "orgAdmin") {
      if (email === "Hdfc@Dhn" && password === "HDFCDhn") {
        isAuthenticated = true;
        login("orgAdmin", "org123"); // Hardcoded organizationId for demonstration
        // Simulate first-time setup check
        const isFirstTimeSetup = false; // This would come from a user profile in a real app
        if (isFirstTimeSetup) {
          redirectPath = "/org-admin-setup"; // Redirect to org admin setup page
        } else {
          redirectPath = "/org-admin"; // Redirect to org admin dashboard
        }
      } else if (email === "apollo@dhn" && password === "apolloDhn") {
        isAuthenticated = true;
        login("orgAdmin", "org456"); // Another hardcoded organizationId
        const isFirstTimeSetup = false; // This would come from a user profile in a real app
        if (isFirstTimeSetup) {
          redirectPath = "/org-admin-setup"; // Redirect to org admin setup page
        } else {
          redirectPath = "/org-admin"; // Redirect to org admin dashboard
        }
      }
    }

    if (isAuthenticated) {
      console.log("Login successful! Redirecting to", redirectPath);
      navigate(redirectPath);
    } else {
      console.log("Login failed: Invalid credentials.");
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                variant={loginType === "user" ? "default" : "outline"}
                onClick={() => setLoginType("user")}
              >
                User Login
              </Button>
              <Button
                type="button"
                variant={loginType === "globalAdmin" ? "default" : "outline"}
                onClick={() => setLoginType("globalAdmin")}
              >
                Global Admin
              </Button>
              <Button
                type="button"
                variant={loginType === "orgAdmin" ? "default" : "outline"}
                onClick={() => setLoginType("orgAdmin")}
              >
                Org Admin
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          {loginType === "user" && (
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}