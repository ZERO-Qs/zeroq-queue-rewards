import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  { id: "1", name: "Alice Johnson", ticket: "A23", queue: "Withdraw 1", status: "waiting", joined: "10:30 AM" },
  { id: "2", name: "Bob Smith", ticket: "B12", queue: "Deposit 2", status: "serving", joined: "10:45 AM" },
  { id: "3", name: "Carol White", ticket: "C45", queue: "Loan Office", status: "completed", joined: "11:00 AM" },
  { id: "4", name: "David Brown", ticket: "A24", queue: "Withdraw 1", status: "waiting", joined: "11:15 AM" },
];

export default function OrgAdminUsers() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Customer Activity</h1>
        <p className="text-muted-foreground">Track customers who joined your queues</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Queue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.ticket}</Badge>
                  </TableCell>
                  <TableCell>{user.queue}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : user.status === "serving"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
