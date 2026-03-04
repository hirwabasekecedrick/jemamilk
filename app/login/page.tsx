"use client";
import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/theme-toggle";

export default function Auth() {
  return (
    <>
    <ModeToggle/>
      <LoginForm />
    </>
  );
}
