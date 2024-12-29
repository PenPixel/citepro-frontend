"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePasswordValidation } from "@/hooks/use-password-validation";
import { cn } from "@/lib/utils";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isValid, error } = usePasswordValidation(password, confirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please make sure your passwords match");
      return;
    }
    setIsLoading(true);

    try {
      const data = await signup(email, password);
      localStorage.setItem("token", data.token);
      toast.success("Welcome to CitePro! You've received 50 free credits.");
      window.location.href = "/generate";
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                error && confirmPassword && "border-red-500 focus-visible:ring-red-500"
              )}
              required
            />
            {error && confirmPassword && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || (confirmPassword && !isValid)}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}