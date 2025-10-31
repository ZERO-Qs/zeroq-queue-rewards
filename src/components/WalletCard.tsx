import { Coins, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  type: "earned" | "redeemed";
  amount: number;
  description: string;
  timestamp: string;
}

interface WalletCardProps {
  balance: number;
  transactions?: Transaction[];
}

export const WalletCard = ({ balance, transactions = [] }: WalletCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary to-accent text-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-white/90 text-sm font-medium">ZQT Balance</span>
          <Coins className="w-5 h-5 text-yellow-300" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="text-4xl font-bold text-white">{balance}</div>
          <p className="text-white/80 text-sm mt-1">ZeroQ Tokens</p>
        </div>

        {transactions.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/20">
            <h4 className="text-sm font-semibold text-white/90 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Recent Activity
            </h4>
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between text-sm">
                <span className="text-white/80">{tx.description}</span>
                <span className={`font-semibold ${tx.type === "earned" ? "text-green-300" : "text-red-300"}`}>
                  {tx.type === "earned" ? "+" : "-"}{tx.amount} ZQT
                </span>
              </div>
            ))}
          </div>
        )}

        <Button 
          variant="secondary" 
          className="w-full bg-white hover:bg-white/90 text-primary font-semibold"
          asChild
        >
          <Link to="/wallet" className="flex items-center justify-center gap-2">
            View Wallet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
