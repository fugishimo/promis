
import { Button } from "@/components/ui/button";

export const WalletConnections = () => {
  return (
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
  );
};
