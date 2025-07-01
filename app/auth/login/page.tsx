"use client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <form className="space-y-4">
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      {/* your form inputs */}
      <Button className="w-full">Login</Button>
    </form>
  );
}
