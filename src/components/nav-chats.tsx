import {
  Folder,
  Forward,
  MoreHorizontal,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/layouts/authContext";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export function NavChats({
  chats,
}: {
  chats: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { socket } = useAuth();
  const { isMobile } = useSidebar();
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    if (socket) {
    }
  });
  const createNewRoom = () => {
    if (socket) {
      socket.emit("create_new_chat_room", roomName);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <SidebarMenuButton className="cursor-pointer">
                <Plus />
                <span>Create Chat Room</span>
              </SidebarMenuButton>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create New Chat Room</AlertDialogTitle>
                <AlertDialogDescription>
                  Please confirm if you'd like to create a new chat room. You
                  can name it below.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <FieldGroup>
                <Field className="gap-2">
                  <FieldLabel htmlFor="chatRoomName">Chat Room Name</FieldLabel>
                  <Input
                    id="chatRoomName"
                    type="text"
                    placeholder="e.g. Project Alpha"
                    required
                    value={roomName}
                    onChange={(ev) => setRoomName(ev.currentTarget.value)}
                  />
                </Field>
              </FieldGroup>

              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={createNewRoom}>
                  Create
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarMenuItem>

        {chats.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
