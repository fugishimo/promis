
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Check your email",
        description: "We sent you a magic link to log in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    }
  };

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
      // Create session log
      supabase.from("session_logs").insert({
        user_id: session.user.id,
        ip_address: "client-side", // We can't get real IP on client side
        user_agent: navigator.userAgent,
      });
      
      // Redirect to home
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl border border-border shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <Button
            variant="outline"
            className="w-full bg-white hover:bg-neutral-50 text-black font-medium h-12"
            onClick={handleGoogleLogin}
          >
            <img
              src="/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
            <Button 
              className="w-full h-12 bg-primary hover:bg-primary/90"
              onClick={handleEmailLogin}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Continue with Email"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or connect wallet
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="p-4 h-auto aspect-square flex items-center justify-center hover:bg-muted"
              onClick={() => console.log("Coinbase Wallet")}
            >
              <img
                src="/coinbase.svg"
                alt="Coinbase"
                className="w-8 h-8"
              />
            </Button>
            
            <Button
              variant="outline"
              className="p-4 h-auto aspect-square flex items-center justify-center hover:bg-muted"
              onClick={() => console.log("MetaMask")}
            >
              <img
                src="/metamask.svg"
                alt="MetaMask"
                className="w-8 h-8"
              />
            </Button>
            
            <Button
              variant="outline"
              className="p-4 h-auto aspect-square flex items-center justify-center hover:bg-muted"
              onClick={() => console.log("Phantom")}
            >
              <img
                src="/phantom.svg"
                alt="Phantom"
                className="w-8 h-8"
              />
            </Button>

            <Button
              variant="outline"
              className="p-4 h-auto aspect-square flex items-center justify-center hover:bg-muted"
              onClick={() => console.log("WalletConnect")}
            >
              <img
                src="/walletconnect.svg"
                alt="WalletConnect"
                className="w-8 h-8"
              />
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
