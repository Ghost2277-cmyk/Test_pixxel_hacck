"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { PasswordInput } from "@/components/ui/PasswordInput";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z.string().min(2, "Country is required"),
  ageGroup: z.string().min(1, "Age group is required"),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  
  const { signup } = useAuth();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // Perform dummy signup
      signup(data.email, data.password, data.name);
      router.push("/onboarding/intro");
    } catch (error: any) {
      console.error("Signup error:", error);
      setError("root", { message: error.message || "Failed to create account" });
    }
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
        <h1 className="text-2xl font-bold font-heading text-white">Join SYLVA-eCO LIFE</h1>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Start your journey to heal the planet.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {errors.root.message}
          </div>
        )}
        
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full bg-[var(--card)] border border-[var(--muted-foreground)]/30 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[var(--muted-foreground)]"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full bg-[var(--card)] border border-[var(--muted-foreground)]/30 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[var(--muted-foreground)]"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <PasswordInput
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              {...register("country")}
              className="w-full bg-[var(--card)] border border-[var(--muted-foreground)]/30 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              <option value="" className="bg-[var(--card)]">Country</option>
              <option value="US" className="bg-[var(--card)]">United States</option>
              <option value="UK" className="bg-[var(--card)]">United Kingdom</option>
              <option value="CA" className="bg-[var(--card)]">Canada</option>
              <option value="IN" className="bg-[var(--card)]">India</option>
            </select>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>
          <div>
            <select
              {...register("ageGroup")}
              className="w-full bg-[var(--card)] border border-[var(--muted-foreground)]/30 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              <option value="" className="bg-[var(--card)]">Age</option>
              <option value="18-24" className="bg-[var(--card)]">18-24</option>
              <option value="25-34" className="bg-[var(--card)]">25-34</option>
              <option value="35-44" className="bg-[var(--card)]">35-44</option>
              <option value="45+" className="bg-[var(--card)]">45+</option>
            </select>
            {errors.ageGroup && <p className="text-red-500 text-xs mt-1">{errors.ageGroup.message}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            {...register("acceptTerms")}
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-[var(--muted-foreground)] text-emerald-500 focus:ring-emerald-500 bg-[var(--card)]"
          />
          <label htmlFor="terms" className="text-sm text-[var(--muted-foreground)]">
            I accept the <a href="#" className="text-emerald-500 hover:underline">Terms of Service</a>
          </label>
        </div>
        {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 magnetic-glow px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              CREATING YOUR ECO PROFILE...
            </>
          ) : (
            "Continue"
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('demo_mode', 'true');
              router.push("/onboarding/intro");
              setTimeout(() => window.location.reload(), 100);
            }
          }}
          className="w-full mt-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2"
        >
          Use Demo Mode (No DB)
        </button>

      </form>

      <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        Already have an account? <a href="/login" className="text-emerald-500 hover:underline">Log in</a>
      </div>
    </motion.div>
  );
}
