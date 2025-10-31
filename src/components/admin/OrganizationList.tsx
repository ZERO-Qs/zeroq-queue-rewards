import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Organization } from "@/types/organization";

const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "HDFC Bank",
    type: "Bank",
    location: "Downtown",
    services: ["Withdraw", "Deposit", "Loan Office"],
    activeQueues: 3,
    avgWaitTime: "10 min",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Apollo Hospital",
    type: "Hospital",
    location: "Medical District",
    services: ["Emergency", "Consultation", "Pharmacy"],
    activeQueues: 5,
    avgWaitTime: "25 min",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "RTO Office",
    type: "Government",
    location: "City Center",
    services: ["DL Issue", "Vehicle Registration", "Permit Renewal"],
    activeQueues: 2,
    avgWaitTime: "15 min",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "SBI Bank",
    type: "Bank",
    location: "Financial District",
    services: ["Withdraw", "Deposit", "Account Opening"],
    activeQueues: 4,
    avgWaitTime: "12 min",
    image: "/placeholder.svg",
  },
];

export default function OrganizationList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Active Queues</TableHead>
              <TableHead>Avg Wait Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrganizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>{org.location}</TableCell>
                <TableCell>{org.activeQueues}</TableCell>
                <TableCell>{org.avgWaitTime}</TableCell>
                <TableCell>
                  <button className="text-blue-600 hover:underline">
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}