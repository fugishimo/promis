import { useNavigate } from "react-router-dom";
import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import { profileService } from "@/services/profileService";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, ready, authenticated, user } = usePrivy();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (authenticated && user) {
        try {
          console.log("User authenticated, checking Privy ID:", user.id);
          
          // Check if user exists and create if they don't
          const uuid = await profileService.getOrCreateUUID(user.id);
          console.log("UUID retrieved/created:", uuid);
          
          // Redirect to home page
          navigate("/");
        } catch (error) {
          console.error("Authentication flow error:", error);
          toast({
            title: "Error",
            description: "Failed to complete login process",
            variant: "destructive",
          });
        }
      }
    };

    handleAuthentication();
  }, [authenticated, user, navigate, toast]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Promis</h1>
        <button
          onClick={login}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
