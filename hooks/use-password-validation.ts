"use client";

import { useState, useEffect } from "react";

export function usePasswordValidation(password: string, confirmPassword: string) {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!confirmPassword) {
      setError("");
      setIsValid(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }, [password, confirmPassword]);

  return { isValid, error };
}