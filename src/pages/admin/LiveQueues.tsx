import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const liveQueues = [
  { id: "1", org: "HDFC Bank", counter: "Withdraw 1", ticket: "A23", eta: "6 min", waiting: 5, status: "active" },
  { id: "2", org: "Apollo Hospital", counter: "OPD 1", ticket: "B12", eta: "8 min", waiting: 7, status: "active" },
  { id: "3", org: "RTO Office", counter: "DL Issue", ticket: "C45", eta: "12 min", waiting: 9, status: "active" },
  { id: "4", org: "SBI Bank", counter: "Deposit 1", ticket: "A34", eta: "4 min", waiting: 3, status: "active" },
  { id: "5", org: "Max Healthcare", counter: "Lab Tests", ticket: "D67", eta: "10 min", waiting: 6, status: "active" },
  { id: "6", org: "ICICI Bank", counter: "Loan Office", ticket: "E89", eta: "15 min", waiting: 2, status: "active" },
];

export default function LiveQueues() {
  const handleCallNext = (org: string, ticket: string) => {
    toast.info(`Calling ${ticket}`, {
      description: `Notifying customer at ${org}`,
    });
  };

  const handleServe = (org: string, ticket: string) => {
    toast.success(`Queue served!`, {
      description: `10 ZQT minted for ${ticket} at ${org}`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Queues</h1>
        <p className="text-muted-foreground">Monitor and manage active queues in real-time</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground mb-1">{liveQueues.length}</div>
            <p className="text-sm text-muted-foreground">Active Queues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground mb-1">
              {liveQueues.reduce((sum, q) => sum + q.waiting, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Waiting</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground mb-1">8.3 min</div>
            <p className="text-sm text-muted-foreground">Avg Wait Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600 mb-1">124</div>
            <p className="text-sm text-muted-foreground">Served Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Queues Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Queues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Counter</TableHead>
                <TableHead>Current Ticket</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Waiting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liveQueues.map((queue) => (
                <TableRow key={queue.id}>
                  <TableCell className="font-medium">{queue.org}</TableCell>
                  <TableCell>{queue.counter}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{queue.ticket}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {queue.eta}
                    </div>
                  </TableCell>
                  <TableCell>{queue.waiting}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {queue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallNext(queue.org, queue.ticket)}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call Next
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleServe(queue.org, queue.ticket)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Serve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
