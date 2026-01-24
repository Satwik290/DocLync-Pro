import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
// import { Stethoscope } from "lucide-react"; // Added for brandingclear
import Logo from "@/assets/ChatGPT Image Jan 23, 2026, 09_18_35 PM.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-md">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex flex-col items-center gap-2 mb-4">
            <img
              src={Logo}
              alt="DocLync Logo"
              className="h-20 w-auto object-contain"
            />

            {/* <span className="text-xl font-bold tracking-tight text-primary">
              DocLync
            </span> */}
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-slate-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-slate-500 font-medium">
            Enter your credentials to access your health portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50/50 backdrop-blur-sm border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 font-semibold ml-1"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@doclync.pro"
                className="h-12 border-slate-200 focus:ring-primary/20 rounded-xl transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label
                  htmlFor="password"
                  title="Password"
                  className="text-slate-700 font-semibold"
                >
                  Password
                </Label>
                <Link
                  to="/forgot"
                  className="text-xs font-medium text-primary hover:text-primary/80"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 border-slate-200 focus:ring-primary/20 rounded-xl transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-xl transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/0 px-2 text-slate-400">
                  New to DocLync?
                </span>
              </div>
            </div>

            <p className="text-center text-sm font-medium">
              <Link
                to="/register"
                className="text-primary hover:underline underline-offset-4"
              >
                Create a professional account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
