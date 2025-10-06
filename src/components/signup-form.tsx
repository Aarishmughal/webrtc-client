import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

import api from "@/lib/api";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        username,
        email,
        password,
        passwordConfirm,
      });
      toast("Account created successfully!");
      console.log("Signup successful:", response);
      navigate("/login");
    } catch (err: any) {
      console.error("Signup failed:", err);
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Signup failed";
      setError(msg);
      toast.error ? toast.error(msg) : toast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account on Web CTR</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field className="gap-2">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                required
                value={username}
                onChange={(ev) => setUsername(ev.currentTarget.value)}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(ev) => setEmail(ev.currentTarget.value)}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.currentTarget.value)}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={passwordConfirm}
                onChange={(ev) => setPasswordConfirm(ev.currentTarget.value)}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>

            <Field className="gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Create Account"}
              </Button>
              {error && (
                <div className="text-sm text-destructive mt-2">{error}</div>
              )}
              <FieldDescription className="px-6 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
