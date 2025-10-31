import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { userType } = useAuth();

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-2xl font-bold">John Doe</h3>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <p className="text-muted-foreground">User Type: {userType}</p>
            </div>
            <div className="grid gap-4 w-full max-w-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Phone:</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Address:</span>
                <span>123 Main St, Anytown, USA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Member Since:</span>
                <span>January 1, 2023</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold mb-2">About Me:</h4>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}