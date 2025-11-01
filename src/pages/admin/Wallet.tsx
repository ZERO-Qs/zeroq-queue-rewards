import React, { useState, useEffect } from 'react';
import { Web3ReactProvider, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { ethers } from 'ethers';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const WalletContent = () => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames();

  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (isActive && accounts && provider) {
      // Ensure provider is an Ethers Web3Provider for getBalance
      const ethersProvider = new ethers.providers.Web3Provider(provider.provider);
      ethersProvider.getBalance(accounts[0]).then((bal: ethers.BigNumber) => {
        setBalance(ethers.utils.formatEther(bal));
      }).catch(() => {
        setBalance(null);
      });
    }
  }, [isActive, accounts, provider]);

  const connectWallet = async () => {
    try {
      await metaMask.activate();
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnectWallet = () => {
    try {
      metaMask.deactivate();
      setBalance(null);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage your crypto wallet and received cryptocurrencies.</p>
      </div>
      <Card className="p-6 bg-card rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <div className="space-y-4">
              <p>Connected Account: <span className="font-medium break-all">{accounts?.[0]}</span></p>
              <p>Balance: <span className="font-medium">{balance ? `${balance} ZQT` : 'Loading...'}</span></p>
              {/* Placeholder for displaying other cryptocurrencies */}
              <div className="mt-4 p-4 border rounded-md bg-muted">
                <h3 className="font-semibold mb-2">Receive Cryptocurrencies</h3>
                <p className="text-sm text-muted-foreground">Share this address to receive funds:</p>
                <p className="font-mono text-sm break-all bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1">{accounts?.[0]}</p>
                {/* Future: Add QR code generation for wallet address */}
              </div>
              <Button onClick={disconnectWallet} variant="destructive">Disconnect Wallet</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">Connect your crypto wallet to view and manage your funds.</p>
              <Button onClick={connectWallet}>Connect Wallet</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Wallet = () => (
  <Web3ReactProvider connectors={[[metaMask, hooks]]}>
    <WalletContent />
  </Web3ReactProvider>
);

export default Wallet;