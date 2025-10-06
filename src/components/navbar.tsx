import { ModeToggle } from "./mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { ArrowRightIcon, Home, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import logo_dark from "@/assets/logo_dark.png";
import logo from "@/assets/logo.png";
import { Link } from "react-router";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <NavigationMenu className="w-full border-b px-6 md:px-12 fixed top-0 left-0 z-50 bg-background">
      <div className="w-full relative px-0 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center space-x-2">
              <img
                src={logo_dark}
                alt="Logo"
                className="h-15 dark:block hidden"
              />
              <img src={logo} alt="Logo" className="h-15 dark:hidden block" />
              <h1 className="md:text-2xl text-xl font-thin">
                Web CTR Application
              </h1>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/home">
                <Button variant="default" size="sm">
                  Dashboard
                  <Home className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm">
                  Get Started
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              </Link>{" "}
            </>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="flex md:hidden items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <SheetHeader>
                <SheetTitle>
                  <img
                    src={logo_dark}
                    alt="Logo"
                    className="h-40 dark:block hidden"
                  />
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-40 dark:hidden block"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col mt-6 space-y-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm">
                    Get Started
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </Link>{" "}
              </div>
              <div className="mt-auto">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
