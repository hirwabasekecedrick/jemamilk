"use client"
import { useState } from "react";

export default function Auth(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("api/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email,password})
        })

        if (res.ok) {
            const data = await res.json();
            return console.log("User Login Succesful",data);
            
        }else{
            return console.log("Failed To log in ")
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Login" />
        </form>
        </>
    )
}