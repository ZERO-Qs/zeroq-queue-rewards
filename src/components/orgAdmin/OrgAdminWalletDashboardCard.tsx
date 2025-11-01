import React, { useState, useEffect } from 'react';
import { MetaMask } from '@web3-react/metamask';
import { initializeConnector } from '@web3-react/core';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Coins, Plug, XCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));
const { useChainId, useAccounts, useIsActive, useProvider } = hooks;

function WalletDashboardContent() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();
  const provider = useProvider();

  const [balance, setBalance] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    const storedTestMode = localStorage.getItem('isTestMode');
    if (storedTestMode !== null) {
      setIsTestMode(JSON.parse(storedTestMode));
    }
  }, []);

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

  return (
    <Link to="/org-admin/wallet" className="block">
      <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg rounded-xl cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Wallet Balance</CardTitle>
          <Coins className="h-5 w-5 text-white/80" />
        </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{balance || "0.00 ZQT"}</div>
        <p className="text-xs text-white/70 mt-1">Total cryptocurrency holdings</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          {isTestMode ? (
            <span className="flex items-center text-green-300">
              <CheckCircle className="h-4 w-4 mr-1" /> Mock Data
            </span>
          ) : (
            isActive ? (
              <span className="flex items-center text-green-300">
                <Plug className="h-4 w-4 mr-1" /> Connected
              </span>
            ) : (
              <Button onClick={connectWallet} size="sm" variant="secondary" className="text-blue-600">
                Connect Wallet
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}

export default function OrgAdminWalletDashboardCard() {
  return (
    <Web3ReactProvider connectors={[[metaMask, hooks]]}>
      <WalletDashboardContent />
    </Web3ReactProvider>
  );
}