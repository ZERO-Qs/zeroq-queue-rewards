import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Gift, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { id: "1", type: "earned", amount: 10, description: "Queue served at HDFC Bank", timestamp: "2 hours ago", status: "completed" },
  { id: "2", type: "earned", amount: 10, description: "Queue served at Apollo Hospital", timestamp: "1 day ago", status: "completed" },
  { id: "3", type: "redeemed", amount: 5, description: "Premium skip purchased", timestamp: "2 days ago", status: "completed" },
  { id: "4", type: "earned", amount: 10, description: "Queue served at RTO Office", timestamp: "3 days ago", status: "completed" },
  { id: "5", type: "earned", amount: 10, description: "Queue served at SBI Bank", timestamp: "4 days ago", status: "completed" },
];

const rewards = [
  { id: "1", title: "Priority Queue Access", cost: 20, description: "Skip 5 people in any queue" },
  { id: "2", title: "Premium Appointment", cost: 50, description: "Schedule priority time slot" },
  { id: "3", title: "VIP Fast Track", cost: 100, description: "Instant service access for a day" },
];

export default function Wallet() {
  const totalBalance = 50;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">My Wallet</h1>
          <p className="text-muted-foreground">Manage your ZQT tokens and rewards</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-primary to-accent text-white shadow-xl animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>Total Balance</span>
                  <Coins className="w-6 h-6 text-yellow-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-2">{totalBalance}</div>
                <p className="text-white/80 text-lg">ZeroQ Tokens (ZQT)</p>
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-300" />
                  <span className="text-white/90">+40 this month</span>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "earned" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {tx.type === "earned" ? (
                            <ArrowDownRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{tx.description}</p>
                          <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          tx.type === "earned" ? "text-green-600" : "text-red-600"
                        }`}>
                          {tx.type === "earned" ? "+" : "-"}{tx.amount} ZQT
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Rewards */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Redeem Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-4 rounded-lg border hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{reward.title}</h4>
                      <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500">
                        {reward.cost} ZQT
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      disabled={totalBalance < reward.cost}
                      variant={totalBalance >= reward.cost ? "default" : "secondary"}
                    >
                      {totalBalance >= reward.cost ? "Redeem" : "Not enough ZQT"}
                    </Button>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-foreground mb-2">Earn More Tokens</h4>
                  <p className="text-sm text-muted-foreground">
                    Join queues and get served to earn 10 ZQT per visit!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
