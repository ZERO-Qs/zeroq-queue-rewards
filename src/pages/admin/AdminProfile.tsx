import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminProfile() {
  const { userType } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Global Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg">Welcome, Global Admin!</p>
          <p className="text-sm text-muted-foreground mt-2">This is the global administrator's profile page.</p>
          <p className="text-sm text-muted-foreground mt-2">User Type: {userType}</p>
          {/* Placeholder for admin information */}
          <div className="mt-4 p-4 border rounded-md bg-muted">
            <h3 className="font-semibold">Admin Details:</h3>
            <p>Admin ID: GADM001</p>
            <p>Role: Super Administrator</p>
            {/* Add more admin details here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}