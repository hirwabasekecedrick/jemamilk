"use client";
import { RegisterForm } from "@/components/register-form";

export default function Register() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-3/5 px-10">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
