import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, CheckCircle, Pause, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const queues = [
  { id: "1", name: "Withdraw 1", counter: "Counter 1", ticket: "A23", eta: "6 min", waiting: 5, status: "active" },
  { id: "2", name: "Deposit 2", counter: "Counter 2", ticket: "B12", eta: "8 min", waiting: 7, status: "active" },
  { id: "3", name: "Loan Office", counter: "Counter 3", ticket: "C45", eta: "12 min", waiting: 9, status: "paused" },
];

export default function OrgAdminQueues() {
  const handleCallNext = (name: string, ticket: string) => {
    toast.info(`Calling ${ticket}`, {
      description: `Notifying customer for ${name}`,
    });
  };

  const handleServe = (name: string, ticket: string) => {
    toast.success(`Queue served!`, {
      description: `${ticket} completed at ${name}`,
    });
  };

  const handlePause = (name: string) => {
    toast.warning(`Queue paused`, {
      description: `${name} is now paused`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Queues</h1>
          <p className="text-muted-foreground">Monitor and control your active queues</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Queue
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Queues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Queue Name</TableHead>
                <TableHead>Counter</TableHead>
                <TableHead>Current Ticket</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Waiting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queues.map((queue) => (
                <TableRow key={queue.id}>
                  <TableCell className="font-medium">{queue.name}</TableCell>
                  <TableCell>{queue.counter}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{queue.ticket}</Badge>
                  </TableCell>
                  <TableCell>{queue.eta}</TableCell>
                  <TableCell>{queue.waiting}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        queue.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      }
                    >
                      {queue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePause(queue.name)}
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallNext(queue.name, queue.ticket)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleServe(queue.name, queue.ticket)}
                      >
                        <CheckCircle className="w-4 h-4" />
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
