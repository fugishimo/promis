
import { Button } from "@/components/ui/button";
import { Wallet, LogIn } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl border border-border shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white hover:bg-neutral-50 text-black font-medium"
            onClick={() => console.log("Google login")}
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
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="w-full hover:bg-muted"
              onClick={() => console.log("Coinbase Wallet")}
            >
              <img
                src="/coinbase.svg"
                alt="Coinbase"
                className="w-5 h-5 mr-2"
              />
              Coinbase Wallet
            </Button>
            
            <Button
              variant="outline"
              className="w-full hover:bg-muted"
              onClick={() => console.log("MetaMask")}
            >
              <img
                src="/metamask.svg"
                alt="MetaMask"
                className="w-5 h-5 mr-2"
              />
              MetaMask
            </Button>
            
            <Button
              variant="outline"
              className="w-full hover:bg-muted"
              onClick={() => console.log("Phantom")}
            >
              <img
                src="/phantom.svg"
                alt="Phantom"
                className="w-5 h-5 mr-2"
              />
              Phantom
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
