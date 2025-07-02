"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [isRedirecting, setIsredirecting] = useState(false);
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      await login(data.username, data.password);
      toast.success("Login successful");
      setIsredirecting(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      let message = "Invalid credentials";

      // Detect 401 and customize message
      if (error?.response?.status === 401) {
        message = "User is not registered or credentials are incorrect";
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }

      // Show toast
      toast.error(message);

      // Show error in form
      form.setError("root", {
        type: "manual",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 rounded-xl bg-background">
      <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <p
              className="
              text-sm text-center
              bg-red-100 dark:bg-red-900   // Light red for light mode, dark red for dark mode
              text-red-700 dark:text-red-200 // Darker text for light mode, lighter for dark mode
              border border-red-400 dark:border-red-700 // Border matches or complements
              rounded-md px-4 py-2 mb-4
              shadow-md
              flex items-center justify-center
              space-x-2
            "
            >
              {form.formState.errors.root.message}
            </p>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isRedirecting}
          >
            {isRedirecting
              ? "Redirecting..." // Display when redirecting
              : isLoading
              ? "Logging in..." // Display when actively logging in
              : "Login"}{" "}
            {/* Default text */}
          </Button>
          <div className="flex justify-between text-sm text-muted-foreground mt-4">
            <Link href="/" className="hover:underline flex items-center gap-1">
              ← Back to homepage
            </Link>

            <Link
              href="/auth/register"
              className="hover:underline flex items-center gap-1"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
