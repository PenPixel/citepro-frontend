"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";
import { creditsManager } from "@/lib/credits";

export function Nav() {
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchCredits();
    }

    // Subscribe to credit updates
    const unsubscribe = creditsManager.subscribe(setCredits);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCredits(null);
    window.location.href = "/";
  };

  const fetchCredits = async () => {
    try {
      const data = await getProfile();
      setCredits(data.credits);
    } catch (error) {
      console.error("Failed to fetch credits:", error);
      // If profile fetch fails, assume token is invalid and logout
      handleLogout();
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <span className="font-bold text-xl">CitePro</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/generate">
                <Button variant="ghost">Generate</Button>
              </Link>
              <Link href="/history">
                <Button variant="ghost">History</Button>
              </Link>
              <div className="bg-primary/10 px-3 py-1 rounded-full">
                {credits} credits
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}