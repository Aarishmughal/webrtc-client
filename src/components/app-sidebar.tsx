"use client";

import * as React from "react";
import { User, VideoIcon } from "lucide-react";

import { NavMeetings } from "@/components/nav-meetings";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavChats } from "./nav-chats";
import { useAuth } from "@/layouts/authContext";
import { Spinner } from "./ui/spinner";

const data = {
  user: {
    username: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMeetings: [
    {
      title: "Room 01",
      url: "#",
      icon: VideoIcon,
      isActive: true,
      items: [
        {
          title: "Recipient 1",
          url: "#",
        },
        {
          title: "Recipient 2",
          url: "#",
        },
        {
          title: "Recipient 3",
          url: "#",
        },
      ],
    },
    {
      title: "Room 02",
      url: "#",
      icon: VideoIcon,

      items: [
        {
          title: "Recipient 1",
          url: "#",
        },
        {
          title: "Recipient 2",
          url: "#",
        },
        {
          title: "Recipient 3",
          url: "#",
        },
      ],
    },
    {
      title: "Room 03",
      url: "#",
      icon: VideoIcon,

      items: [
        {
          title: "Recipient 1",
          url: "#",
        },
        {
          title: "Recipient 2",
          url: "#",
        },
        {
          title: "Recipient 3",
          url: "#",
        },
      ],
    },
    {
      title: "Room 04",
      url: "#",
      icon: VideoIcon,

      items: [
        {
          title: "Recipient 1",
          url: "#",
        },
        {
          title: "Recipient 2",
          url: "#",
        },
        {
          title: "Recipient 3",
          url: "#",
        },
      ],
    },
  ],
  chats: [
    {
      name: "Person 1",
      url: "#",
      icon: User,
    },
    {
      name: "Person 2",
      url: "#",
      icon: User,
    },
    {
      name: "Person 3",
      url: "#",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Sidebar {...props}>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className="size-10"/>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="font-thin data-[state=open]:4xl ">Web CTR</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMeetings items={data.navMeetings} />
        <NavChats chats={data.chats} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
