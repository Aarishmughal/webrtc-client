import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          404
        </h1>
        <p className="mt-6 md:text-lg">
          The page you are trying to get does not exist on this server.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base" onClick={redirectToHome}>
            Go to Home <Home className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ServerError() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          400
        </h1>
        <p className="mt-6 md:text-lg">Something went wrong on our end.</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base" onClick={redirectToHome}>
            Go to Home <Home className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
