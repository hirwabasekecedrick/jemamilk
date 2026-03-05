"use client";
import { LoginForm } from "@/components/login-form";

export default function Auth() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-3/5 px-10">
        <LoginForm />
        </div>
      </div>
    </>
  );
}
