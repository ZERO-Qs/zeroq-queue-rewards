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
              <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" alt="Roshan Kumar" />
              <AvatarFallback>RO</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-2xl font-bold">Roshan Kumar</h3>
              <p className="text-muted-foreground">roshan.kumar@example.com</p>
              <p className="text-muted-foreground">User Type: {userType}</p>
            </div>
            <div className="grid gap-4 w-full max-w-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Phone:</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Address:</span>
                <span>123, Main Street, Bangalore, India</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Member Since:</span>
                <span>January 1, 2023</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold mb-2">About Me:</h4>
                <p className="text-muted-foreground">
                  Passionate about technology and building innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}