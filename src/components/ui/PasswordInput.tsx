import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative w-full">
        <input
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`w-full bg-[var(--card)] border border-[var(--muted-foreground)]/30 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[var(--muted-foreground)] pr-12
            /* CRITICAL FIX for password dots visibility */
            [&::-ms-reveal]:hidden [&::-ms-clear]:hidden
            caret-[var(--foreground)]
            ${className || ''}`}
          style={{
            // Force the font color and text fill color so dots are dark on light backgrounds.
            color: "var(--foreground)",
            WebkitTextFillColor: "var(--foreground)",
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus:outline-none flex items-center justify-center p-1"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
