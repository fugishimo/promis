
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Connection } from '@solana/web3.js';
import { createWalletClient, custom } from '@wagmi/core';

export const WalletConnections = () => {
  const { toast } = useToast();

  const handleCoinbaseWallet = async () => {
    try {
      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: 'Your App Name',
        appLogoUrl: '/coinbase.svg',
      });

      const ethereum = coinbaseWallet.makeWeb3Provider();
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts[0]) {
        const { error } = await supabase.auth.updateUser({
          data: { wallet_address: accounts[0], wallet_type: 'coinbase' }
        });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Coinbase Wallet connected successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to connect Coinbase Wallet",
      });
    }
  };

  const handleMetaMask = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts[0]) {
        const { error } = await supabase.auth.updateUser({
          data: { wallet_address: accounts[0], wallet_type: 'metamask' }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "MetaMask connected successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to connect MetaMask",
      });
    }
  };

  const handlePhantom = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error("Phantom wallet is not installed");
      }

      const connection = new Connection("https://api.mainnet-beta.solana.com");
      await window.solana.connect();

      if (window.solana.publicKey) {
        const { error } = await supabase.auth.updateUser({
          data: { 
            wallet_address: window.solana.publicKey.toString(),
            wallet_type: 'phantom'
          }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Phantom wallet connected successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to connect Phantom wallet",
      });
    }
  };

  const handleWalletConnect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("No Web3 provider found");
      }

      const walletClient = createWalletClient({
        transport: custom(window.ethereum)
      });

      const [address] = await walletClient.requestAddresses();

      if (address) {
        const { error } = await supabase.auth.updateUser({
          data: { 
            wallet_address: address,
            wallet_type: 'walletconnect'
          }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "WalletConnect connected successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to connect with WalletConnect",
      });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <Button
        variant="outline"
        className="p-4 h-auto aspect-square flex items-center justify-center hover:bg-muted"
        onClick={handleCoinbaseWallet}
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
        onClick={handleMetaMask}
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
        onClick={handlePhantom}
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
        onClick={handleWalletConnect}
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
