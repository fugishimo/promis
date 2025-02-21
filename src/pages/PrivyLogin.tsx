
import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button";

const PrivyLogin = () => {
  const { login, ready, authenticated } = usePrivy();
  
  // Disable login when Privy is not ready or user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl border border-border shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Welcome</h1>
        <Button 
          className="w-full"
          disabled={disableLogin}
          onClick={() => login()}
        >
          Login with Privy
        </Button>
      </div>
    </div>
  );
};

export default PrivyLogin;
