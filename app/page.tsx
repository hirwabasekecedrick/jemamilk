// NO "use client"

import { prisma } from "@/lib/prisma"

export default async function Page() {
  const users = await prisma.user.findMany()
console.log(users);
  return <div>

    {
      users.map((user: any) => user.name )
      
      
    }
  </div>
}