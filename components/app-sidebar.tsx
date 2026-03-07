"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "JEMAMILK",
      logo: GalleryVerticalEnd,
      plan: "Farmer",
    }
  ],
  navMain: [
    {
      title: "Quick Actions",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "New Entry",
          url: "#",
        },
        {
          title: "Recent",
          url: "#",
        },
        {
          title: "Farmers",
          url: "#",
        },
      ],
    },
    {
      title: "Milk Stock",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Datagram",
          url: "#",
        },
        {
          title: "Stock",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Work",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Schedule",
          url: "#",
        },
        {
          title: "Chat",
          url: "#",
        },
        {
          title: "Attendance",
          url: "#",
        },
        {
          title: "Announcements",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Appearence",
          url: "#",
        },
        {
          title: "Timers",
          url: "#",
        },
        {
          title: "Dark Mode",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string
    email: string
    avatar: string
  }
}
export function AppSidebar({ user,...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} showNames/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
