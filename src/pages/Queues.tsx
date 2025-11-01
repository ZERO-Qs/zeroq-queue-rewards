import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Queues = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Queues & Appointments</h1>

      <Tabs defaultValue="joined" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="joined">Joined Queues</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="previous">Previous Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="joined">
          <Card>
            <CardHeader>
              <CardTitle>Joined Queues</CardTitle>
              <CardDescription>View the queues you are currently a part of.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>No joined queues found.</p>
              {/* Map through joined queues here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>See your scheduled appointments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>No upcoming appointments.</p>
              {/* Map through upcoming appointments here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="previous">
          <Card>
            <CardHeader>
              <CardTitle>Previous Appointments</CardTitle>
              <CardDescription>Review your past appointments (completed, left, closed).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>No previous appointments.</p>
              {/* Map through previous appointments here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Queues;