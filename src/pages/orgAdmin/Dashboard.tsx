import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, CheckCircle, Users } from "lucide-react";

export default function OrgAdminDashboard() {
  const stats = [
    { title: "Active Queues", value: "12", icon: Activity, color: "text-blue-600" },
    { title: "Avg Wait Time", value: "8.5 min", icon: Clock, color: "text-orange-600" },
    { title: "Served Today", value: "89", icon: CheckCircle, color: "text-green-600" },
    { title: "Total Customers", value: "347", icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Organization Dashboard</h1>
        <p className="text-muted-foreground">Monitor your branch performance and manage queues</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
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
            {[
              { action: "Queue Served", counter: "Withdraw 1", ticket: "A23", time: "2 min ago" },
              { action: "New Customer", counter: "Deposit 2", ticket: "B45", time: "5 min ago" },
              { action: "Queue Paused", counter: "Loan Office", ticket: "-", time: "12 min ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.counter} • Ticket {activity.ticket}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
