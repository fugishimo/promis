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
    const checkUserProfile = async () => {
      if (authenticated && user) {
        try {
          console.log("Checking profile for user:", user.id);
          const profile = await profileService.getProfile(user.id);
          
          if (profile) {
            console.log("Profile found, navigating to home");
            navigate("/");
          } else {
            console.log("No profile found, redirecting to profile creation");
            navigate("/profile");
          }
        } catch (error) {
          console.error("Error checking profile:", error);
          toast({
            title: "Error",
            description: "Failed to check profile status",
            variant: "destructive",
          });
          navigate("/profile");
        }
      }
    };

    checkUserProfile();
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
