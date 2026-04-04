 "use client";
 
 import { useState } from "react";
 import { Mail } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";
 import { toast } from "sonner";
 
 export function ForgotPasswordForm() {
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");
     setSuccess("");
 
     try {
       const data = await forgotPassword({ email }).unwrap();
 
       const message =
         data?.message ||
         "If an account exists for this email, password reset instructions have been sent.";
 
       setSuccess(message);
 
       toast.success("Reset link sent", {
         description: message,
       });
     } catch (err) {
       const message =
         err?.data?.message ||
         (Array.isArray(err?.data?.message) ? err.data.message[0] : null) ||
         "Failed to send reset instructions. Please try again.";
       setError(message);
 
       toast.error("Unable to send reset link", {
         description: message,
       });
     }
   };
 
   return (
     <form onSubmit={handleSubmit} className="space-y-6">
       <div className="space-y-2">
         <label
           htmlFor="email"
           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700"
         >
           Email
         </label>
         <div className="relative">
           <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
           <Input
             id="email"
             type="email"
             placeholder="name@example.com"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             autoComplete="email"
             autoCapitalize="none"
             autoCorrect="off"
            className="h-11 bg-white/80 border-zinc-200 pl-9 shadow-sm backdrop-blur-md focus:border-[color:rgba(77,140,30,0.45)] focus:ring-[color:rgba(77,140,30,0.18)] dark:bg-zinc-950/60 dark:border-zinc-800"
             required
           />
         </div>
       </div>
 
       {error && (
         <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
           {error}
         </p>
       )}
       {success && (
        <p className="rounded-xl border border-[color:rgba(77,140,30,0.18)] bg-secondary px-4 py-3 text-sm text-primary">
           {success}
         </p>
       )}
 
       <Button
         type="submit"
         disabled={isLoading}
        className="h-11 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-sm transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
       >
         {isLoading ? "Sending..." : "Send reset instructions"}
       </Button>
     </form>
   );
 }
 
