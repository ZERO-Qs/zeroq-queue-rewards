import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Coins, Clock } from "lucide-react";

const metrics = [
  { title: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-600" },
  { title: "Active Queues", value: "34", change: "+5%", icon: Activity, color: "from-green-500 to-emerald-600" },
  { title: "Tokens Minted", value: "12,450", change: "+28%", icon: Coins, color: "from-amber-500 to-yellow-600" },
  { title: "Avg Wait Time", value: "8.3 min", change: "-15%", icon: Clock, color: "from-purple-500 to-pink-600" },
];

const recentActivity = [
  { id: "1", org: "HDFC Bank", action: "Token minted", user: "User #1247", time: "2 min ago" },
  { id: "2", org: "Apollo Hospital", action: "Queue joined", user: "User #1248", time: "5 min ago" },
  { id: "3", org: "RTO Office", action: "Queue served", user: "User #1245", time: "8 min ago" },
  { id: "4", org: "SBI Bank", action: "Token minted", user: "User #1243", time: "12 min ago" },
  { id: "5", org: "Max Healthcare", action: "Queue joined", user: "User #1249", time: "15 min ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your queue management system</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  {metric.title}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.org} • {activity.user}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Most Active Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground mb-1">HDFC Bank</p>
            <p className="text-sm text-muted-foreground">847 queues served today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground mb-1">10 AM - 2 PM</p>
            <p className="text-sm text-muted-foreground">Highest traffic period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Token Redemption Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground mb-1">73%</p>
            <p className="text-sm text-muted-foreground">Users actively redeeming</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
