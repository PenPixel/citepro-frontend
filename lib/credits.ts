"use client";

// Create a simple event system for credit updates
const creditUpdateListeners: ((credits: number) => void)[] = [];

export const creditsManager = {
  subscribe: (listener: (credits: number) => void) => {
    creditUpdateListeners.push(listener);
    return () => {
      const index = creditUpdateListeners.indexOf(listener);
      if (index > -1) {
        creditUpdateListeners.splice(index, 1);
      }
    };
  },

  updateCredits: (credits: number) => {
    creditUpdateListeners.forEach(listener => listener(credits));
  }
};