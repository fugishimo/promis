import { useNavigate } from "react-router-dom";
import { usePrivy } from '@privy-io/react-auth';

const Login = () => {
  const navigate = useNavigate();
  const { login, logout, ready, authenticated } = usePrivy();

  // Redirect if already authenticated
  if (authenticated) {
    navigate("/");
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl border border-border shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {authenticated ? (
          <button
            onClick={logout}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={login}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium"
          >
            Sign In
          </button>
        )}

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
