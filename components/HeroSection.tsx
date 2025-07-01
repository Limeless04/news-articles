"use client";

import React from "react";
import { Button } from "@/components/ui/button";


export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[40vh] bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-white max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Cyber News
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Stay informed with the latest updates and trends in technology.
        </p>
        <Button>Get Started</Button>
      </div>
    </section>
  );
}
