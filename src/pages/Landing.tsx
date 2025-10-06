import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";
import logo_dark from "@/assets/logo_dark.png";
import logo from "@/assets/logo.png";
import Footer from "@/components/footer";
import { useAuth } from "@/layouts/authContext";

const Landing = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const { socket } = useAuth();
  const onClickInstant = () => {
    socket?.emit("message", "HI SERVER! I am requesting New Meeting");
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center border-l border-r h-full flex flex-col items-center justify-center bg-background">
          <img
            src={logo_dark}
            alt="Logo"
            className="h-36 md:h-44 lg:h-56 xl:h-80 dark:block hidden w-auto"
          />
          <img
            src={logo}
            alt="Logo"
            className="h-36 md:h-44 lg:h-56 xl:h-80 dark:hidden block w-auto"
          />
          <h1 className="text-5xl sm:text-9xl md:text-9xl lg:text-9xl xl:text-9xl px-12 mb-8 font-thin tracking-tighter md:leading-[1.2]">
            Welcome to the Web CTR
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            A simple and efficient way to manage your meetings.
          </p>
          <div className="flex gap-4">
            {isLoggedIn ? (
              <Link to="/home">
                <Button variant="default" size="lg">
                  Go to Dashboard
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="lg" className="md:text-lg">
                    Login
                  </Button>
                </Link>
                <Link to="/meeting">
                  <Button variant="default" size="lg" className="md:text-lg">
                    Start Instant Meeting
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="lg"
                  className="md:text-lg"
                  onClick={onClickInstant}
                >
                  Start Instant Meeting
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Landing;
