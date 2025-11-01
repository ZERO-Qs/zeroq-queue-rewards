import React, { useState, useEffect } from 'react';
import { MetaMask } from '@web3-react/metamask';
import { initializeConnector } from '@web3-react/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Coins, Wallet as WalletIcon, Plug, XCircle, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useWeb3React } from '@web3-react/core';

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));
const { useChainId, useAccounts, useIsActive, useProvider } = hooks;

function WalletContent() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();
  const provider = useProvider();

  const [balance, setBalance] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(() => {
    const storedTestMode = localStorage.getItem('isTestMode');
    return storedTestMode ? JSON.parse(storedTestMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('isTestMode', JSON.stringify(isTestMode));
  }, [isTestMode]);

  useEffect(() => {
    if (isTestMode) {
      setBalance("100.00 ZQT (Mock)");
      return;
    }

    if (isActive && accounts && provider) {
      const getBalance = async () => {
        try {
          const signer = provider.getSigner();
          const rawBalance = await signer.getBalance();
          setBalance(parseFloat(rawBalance.toString()) / 1e18 + " ZQT");
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance("Error fetching balance");
        }
      };
      getBalance();
    } else {
      setBalance(null);
    }
  }, [isActive, accounts, provider, isTestMode]);

  const connectWallet = () => {
    metaMask.activate();
  };

  const disconnectWallet = () => {
    metaMask.deactivate();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organization Admin Wallet</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="test-mode"
            checked={isTestMode}
            onCheckedChange={setIsTestMode}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground"
          />
          <Label htmlFor="test-mode" className="text-sm text-muted-foreground">Test Mode</Label>
        </div>
      </div>

      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Current Balance</CardTitle>
          <Coins className="h-5 w-5 text-white/80" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{balance || "0.00 ZQT"}</div>
          <p className="text-xs text-white/70 mt-1">Total cryptocurrency holdings</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Wallet Connection Status</CardTitle>
          <a href="https://github.com/rk-roshan-kr/dao-treasury-dashboard" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Manage with Cryptic</Button>
          </a>
        </CardHeader>
        <CardContent className="space-y-4">
          {isTestMode ? (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span>Test Mode Active: Displaying Mock Data</span>
            </div>
          ) : (
            <>
              {isActive ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <Plug className="h-5 w-5" />
                    <span>Connected to MetaMask</span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Chain ID:</p>
                      <p className="font-medium">{chainId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account:</p>
                      <p className="font-medium break-all">{accounts?.[0]}</p>
                    </div>
                  </div>
                  <Button onClick={disconnectWallet} variant="destructive" className="w-full mt-4">
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <XCircle className="h-5 w-5" />
                    <span>Not Connected to MetaMask</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Connect your crypto wallet to view and manage your funds.</p>
                  <Button onClick={connectWallet} className="w-full mt-4">
                    Connect Wallet
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isTestMode ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Deposit</p>
                <p className="text-sm text-green-600">+50 ZQT (Mock)</p>
                <p className="text-xs text-muted-foreground">2023-10-26</p>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Withdrawal</p>
                <p className="text-sm text-red-600">-10 ZQT (Mock)</p>
                <p className="text-xs text-muted-foreground">2023-10-25</p>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Deposit</p>
                <p className="text-sm text-green-600">+20 ZQT (Mock)</p>
                <p className="text-xs text-muted-foreground">2023-10-24</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Connect your wallet to view transaction history.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function OrgAdminWallet() {
  return (
    <Web3ReactProvider connectors={[[metaMask, hooks]]}>
      <WalletContent />
    </Web3ReactProvider>
  );
}