import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./../components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
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
import { Field, FieldGroup, FieldLabel } from "./../components/ui/field";
import { ArrowUpRight, MessageCirclePlus } from "lucide-react";
import { useAuth } from "@/layouts/authContext";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Home() {
  const { socket } = useAuth();
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post("/chats/", {
        roomName,
      });
      toast("Chat Room created successfully!");
      if (socket) {
        console.log(response);
        socket.emit("join_room", response.data._id);
        socket.on("join_room_success", (response) => {
          console.log(response);
          navigate(`/chats/${response}`);
        });
      }
    } catch (err: any) {
      console.error("Could not create Chat Room:", err);
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Could not create Chat Room";
      toast.error ? toast.error(msg) : toast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <SidebarTrigger className="h-10 w-10 flex items-center justify-center " />
        <ModeToggle />
      </div>
      <SidebarInset>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
              Welcome to Web CTR
            </h1>
            <p className="mt-6 md:text-lg">
              We help you manage your meetings efficiently. <br />
              Start by Creating a new Instant Meeting now.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button size="lg" className="text-base">
                Get Started <ArrowUpRight className="size-5" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="text-base" variant="outline">
                    Create new Chat Room{" "}
                    <MessageCirclePlus className="size-5" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Create New Chat Room</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please confirm if you'd like to create a new chat room.
                      You can name it below.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <FieldGroup>
                    <Field className="gap-2">
                      <FieldLabel htmlFor="chatRoomName">
                        Chat Room Name
                      </FieldLabel>
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
                    <AlertDialogAction onClick={handleSubmit}>
                      {loading ? <Spinner /> : "Create"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
