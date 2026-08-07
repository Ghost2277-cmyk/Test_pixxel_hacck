"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Mock signup delay
    await new Promise((r) => setTimeout(r, 1000));
    // Route to Eco DNA intro
    router.push("/onboarding/intro");
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
        <h1 className="text-2xl font-bold font-heading text-white">Join EcoLife</h1>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Start your journey to heal the planet.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              {...register("country")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              <option value="" className="bg-slate-900">Country</option>
              <option value="US" className="bg-slate-900">United States</option>
              <option value="UK" className="bg-slate-900">United Kingdom</option>
              <option value="CA" className="bg-slate-900">Canada</option>
              <option value="IN" className="bg-slate-900">India</option>
            </select>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
          </div>
          <div>
            <select
              {...register("ageGroup")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              <option value="" className="bg-slate-900">Age</option>
              <option value="18-24" className="bg-slate-900">18-24</option>
              <option value="25-34" className="bg-slate-900">25-34</option>
              <option value="35-44" className="bg-slate-900">35-44</option>
              <option value="45+" className="bg-slate-900">45+</option>
            </select>
            {errors.ageGroup && <p className="text-red-400 text-xs mt-1">{errors.ageGroup.message}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            {...register("acceptTerms")}
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-white/20 text-emerald-500 focus:ring-emerald-500 bg-white/5"
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I accept the <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>
          </label>
        </div>
        {errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 magnetic-glow px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-300 disabled:opacity-50 flex justify-center items-center"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>

      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account? <a href="/login" className="text-emerald-400 hover:underline">Log in</a>
      </div>
    </motion.div>
  );
}
