import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import Background from "./components/background";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layouts/auth";
import Home from "./pages/Home";
import ProtectedRoute from "./components/protected-route";
import PublicRoute from "./components/public-route";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Background />
          <Toaster />
          <div className="relative z-10 min-h-screen w-full ">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="min-h-screen w-full relative">
                    <Landing />
                  </div>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <AuthLayout>
                      <Signup />
                    </AuthLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
