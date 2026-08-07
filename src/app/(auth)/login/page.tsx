"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Mock login delay
    await new Promise((r) => setTimeout(r, 1000));
    // Route to dashboard (assuming already onboarded for login flow)
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card p-8 rounded-3xl w-full"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
          <Leaf className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-white">Welcome Back</h1>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Log in to continue healing the Earth.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/20 text-emerald-500 focus:ring-emerald-500 bg-white/5" />
            <label htmlFor="remember" className="text-sm text-gray-400">Remember me</label>
          </div>
          <a href="#" className="text-sm text-emerald-400 hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 magnetic-glow px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-300 disabled:opacity-50 flex justify-center items-center"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            "Log In"
          )}
        </button>

      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V15.08H7.5v-3.08h2.938V9.818c0-2.894 1.724-4.5 4.385-4.5 1.267 0 2.6.226 2.6.226v2.855H15.96c-1.442 0-1.894.894-1.894 1.815v2.184h3.25l-.519 3.08h-2.731v6.798C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
            Apple
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        Don't have an account? <a href="/signup" className="text-emerald-400 hover:underline">Sign up</a>
      </div>
    </motion.div>
  );
}
