"use client"
import { RegisterForm } from "@/components/register-form";
import { ModeToggle } from "@/components/theme-toggle";
import { useState } from "react"

export default function Register(){
    return (
        <>
        <ModeToggle/>
        <RegisterForm/>
        </>
    )
}