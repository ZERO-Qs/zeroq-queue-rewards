import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Edit, Trash2, Plus } from "lucide-react";

const counters = [
  { id: "1", name: "Withdraw Counter 1", staff: "John Doe", status: "active", served: 23 },
  { id: "2", name: "Deposit Counter 2", staff: "Jane Smith", status: "active", served: 18 },
  { id: "3", name: "Loan Office", staff: "Bob Wilson", status: "inactive", served: 12 },
];

export default function OrgAdminCounters() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Counters</h1>
          <p className="text-muted-foreground">Configure and monitor service counters</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Counter
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counters.map((counter) => (
          <Card key={counter.id} className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Monitor className="w-8 h-8 text-primary" />
                <Badge
                  className={
                    counter.status === "active"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  }
                >
                  {counter.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">{counter.name}</h3>
                <p className="text-sm text-muted-foreground">Staff: {counter.staff}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-2xl font-bold text-foreground">{counter.served}</p>
                  <p className="text-xs text-muted-foreground">Served Today</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
