"use client"
import { useState } from "react"

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role,setRole] = useState("CUSTOMER")
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const res = await fetch("api/register", {
            method: "POST",
            headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password,role})
        })
        if (res.ok) {
            console.log("Registration Successful");
            const data = await   res.json()
            console.log(data);
            
        }else{
            console.log("Registration Failed Miserably");
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" id="" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value={`Create`}/>
        </form>
        </>
    )
}