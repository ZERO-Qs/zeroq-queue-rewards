import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function OrgAdminProfile() {
  const { userType } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Organization Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg">Welcome, Organization Admin!</p>
          <p className="text-sm text-muted-foreground mt-2">This is your organization's profile page.</p>
          <p className="text-sm text-muted-foreground mt-2">User Type: {userType}</p>
          {/* Placeholder for organization setup information */}
          <div className="mt-4 p-4 border rounded-md bg-muted">
            <h3 className="font-semibold">Organization Details:</h3>
            <p>Organization Name: [Org Name]</p>
            <p>Industry: [Industry]</p>
            <p>Number of Employees: [Count]</p>
            {/* Add more organization details here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}