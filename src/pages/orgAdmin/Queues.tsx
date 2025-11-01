import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, CheckCircle, Pause, Plus, Play, Monitor, UserCheck, History } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react"; // Import useEffect
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Counter } from "./Counters"; // Import Counter interface

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Queue {
  id: string;
  name: string;
  counter: string;
  ticket: string;
  eta: number;
  waiting: number;
  status: "active" | "paused" | "served" | "ongoing"; // Added 'ongoing' status
  startTime?: string; // Optional start time
  endTime?: string; // Optional end time
}

const initialQueues: Queue[] = [
  { id: "1", name: "Withdraw 1", counter: "Counter 1", ticket: "A23", eta: 6, waiting: 5, status: "active" },
  { id: "2", name: "Deposit 2", counter: "Counter 2", ticket: "B12", eta: 8, waiting: 7, status: "active" },
  { id: "3", name: "Loan Office", counter: "Counter 3", ticket: "C45", eta: 12, waiting: 9, status: "paused" },
];

export default function OrgAdminQueues() {
  const [queues, setQueues] = useState<Queue[]>(() => {
    const savedQueues = localStorage.getItem("queues");
    return savedQueues ? JSON.parse(savedQueues) : initialQueues;
  });
  const [historyQueues, setHistoryQueues] = useState<Queue[]>(() => {
    const savedHistoryQueues = localStorage.getItem("historyQueues");
    return savedHistoryQueues ? JSON.parse(savedHistoryQueues) : [];
  }); // New state for history
  const [isNewQueueModalOpen, setIsNewQueueModalOpen] = useState(false);
  const [newQueueName, setNewQueueName] = useState("");
  const [newQueueCounter, setNewQueueCounter] = useState("");
  const [newQueueTicket, setNewQueueTicket] = useState(""); // Re-added newQueueTicket state
  const [newQueueEta, setNewQueueEta] = useState(0);
  const [newQueueWaiting, setNewQueueWaiting] = useState(0);
  const [newQueueStatus, setNewQueueStatus] = useState<QueueStatus>("active");

  const [counters, setCounters] = useState<Counter[]>(() => {
    const savedCounters = localStorage.getItem("counters");
    return savedCounters ? JSON.parse(savedCounters) : [
      { id: "1", name: "Withdraw Counter 1", staff: "John Doe", status: "active", served: 23, paused: false },
      { id: "2", name: "Deposit Counter 2", staff: "Jane Smith", status: "active", served: 18, paused: false },
      { id: "3", name: "Loan Office", staff: "Bob Wilson", status: "inactive", served: 12, paused: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem("queues", JSON.stringify(queues));
  }, [queues]);

  useEffect(() => {
    localStorage.setItem("historyQueues", JSON.stringify(historyQueues));
  }, [historyQueues]);

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const activeCounters = counters.filter(counter => counter.status === "active");

  const calculateEta = (counterName: string, currentQueues: Queue[]) => {
    const queuesForCounter = currentQueues.filter(q => q.counter === counterName && q.status !== "served");
    const baseEta = queuesForCounter.length * 3; // 3 minutes per person in queue
    return baseEta > 0 ? baseEta : 1; // Minimum 1 minute ETA if no one is in queue
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQueues((prevQueues) =>
        prevQueues.map((queue) => {
          const counter = counters.find(c => c.name === queue.counter);
          if (queue.status === "active" && queue.eta > 0 && !counter?.paused) {
            return { ...queue, eta: queue.eta - 1 };
          }
          return queue;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [counters]);

  useEffect(() => {
    localStorage.setItem("queues", JSON.stringify(queues));
  }, [queues]);

  useEffect(() => {
    localStorage.setItem("historyQueues", JSON.stringify(historyQueues));
  }, [historyQueues]);

  const handleCallNext = (id: string, name: string, ticket: string) => {
    setQueues((prevQueues) => {
      const queueToCall = prevQueues.find((queue) => queue.id === id);
      if (!queueToCall) {
        return prevQueues;
      }

      const counter = counters.find(c => c.name === queueToCall.counter);
      if (counter?.paused) {
        toast.error(`Counter ${counter.name} is paused. Cannot call ${ticket}.`);
        return prevQueues; // Return previous state if counter is paused
      }

      toast.info(`Calling ${ticket}`, {
        description: `Notifying customer for ${name}`,
      });

      return prevQueues.map((queue) =>
        queue.id === id ? { ...queue, status: "calling" } : queue
      );
    });
  };

  const handleServe = (id: string, name: string, ticket: string) => {
    setQueues((prevQueues) => {
      const queueToServe = prevQueues.find((queue) => queue.id === id);
      if (!queueToServe) {
        return prevQueues;
      }

      const counter = counters.find(c => c.name === queueToServe.counter);
      if (counter?.paused) {
        toast.error(`Counter ${counter.name} is paused. Cannot serve ${ticket}.`);
        return prevQueues; // Return previous state if counter is paused
      }

      toast.success(`Queue served!`, {
        description: `${name} with ticket ${ticket} has been served.`,
      });

      const servedQueue = { ...queueToServe, status: "served", endTime: new Date().toISOString() };
      setHistoryQueues((prevHistory) => [...prevHistory, servedQueue]);

      return prevQueues.filter((queue) => queue.id !== id);
    });
  };

  const handlePause = (id: string, name: string) => {
    setQueues((prevQueues) =>
      prevQueues.map((queue) => {
        if (queue.id === id) {
          const newStatus = queue.status === "paused" ? "active" : "paused";
          toast.warning(`Queue ${newStatus}`, {
            description: `${name} is now ${newStatus}`,
          });
          return { ...queue, status: newStatus };
        }
        return queue;
      })
    );
  };

  const handleToggleCounterPause = (counterId: string) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) => {
        if (counter.id === counterId) {
          const newPausedStatus = !counter.paused;
          toast.info(`${counter.name} is now ${newPausedStatus ? "paused" : "active"}`, {
            description: `All queues for ${counter.name} are ${newPausedStatus ? "paused" : "active"}.`,
          });
          // Update the status of queues associated with this counter
          setQueues((prevQueues) =>
            prevQueues.map((queue) =>
              queue.counter === counter.name ? { ...queue, status: newPausedStatus ? "paused" : "active" } : queue
            )
          );
          return { ...counter, paused: newPausedStatus };
        }
        return counter;
      })
    );
  };

  const handleAddNewQueue = () => {
    if (!newQueueName || !newQueueCounter || !newQueueTicket || newQueueEta === undefined) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const waitingCount = queues.filter(q => q.counter === newQueueCounter && q.status !== "served").length;

    const newQueue: Queue = {
      id: String(queues.length + historyQueues.length + 1), // Unique ID generation
      name: newQueueName,
      counter: newQueueCounter,
      ticket: newQueueTicket,
      eta: waitingCount * newQueueEta, // Calculate ETA based on waiting count and service time per user
      waiting: waitingCount, // Automatically set waiting count
      status: newQueueStatus,
    };

    setQueues((prev) => {
      const updatedQueues = [...prev, newQueue];
      localStorage.setItem("queues", JSON.stringify(updatedQueues));
      localStorage.setItem("counters", JSON.stringify(counters)); // Persist counters as well
      return updatedQueues;
    });
    setIsNewQueueModalOpen(false);
    setNewQueueName("");
    setNewQueueCounter("");
    setNewQueueTicket("");
    setNewQueueEta(0);
    setNewQueueWaiting(0); // Reset to 0, as it's now calculated
    setNewQueueStatus("active");
    toast.success("New queue added successfully!");
  };
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Queues</h1>
          <p className="text-muted-foreground">Monitor and control your active queues</p>
        </div>
        <Dialog open={isNewQueueModalOpen} onOpenChange={setIsNewQueueModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Queue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Queue</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newQueueName}
                  onChange={(e) => setNewQueueName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="counter" className="text-right">
                  Counter
                </Label>
                <Select
                  onValueChange={(value) => {
                    setNewQueueCounter(value);
                  }}
                  value={newQueueCounter}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a counter" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeCounters.map((counter) => (
                      <SelectItem key={counter.id} value={counter.name}>
                        {counter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ticket" className="text-right">
                  Ticket
                </Label>
                <Input
                  id="ticket"
                  value={newQueueTicket}
                  onChange={(e) => setNewQueueTicket(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eta" className="text-right">
                  Service Time per User (minutes)
                </Label>
                <Input
                  id="eta"
                  type="number"
                  value={newQueueEta}
                  onChange={(e) => setNewQueueEta(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="waiting" className="text-right">
                  Waiting
                </Label>
                <Input
                  id="waiting"
                  type="number"
                  value={queues.filter(q => q.counter === newQueueCounter && q.status !== "served").length}
                  readOnly // Make Waiting read-only as it's generated
                  className="col-span-3 bg-gray-100 dark:bg-gray-800"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={newQueueStatus} onValueChange={(value: "active" | "paused" | "served" | "ongoing") => setNewQueueStatus(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="served">Served</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddNewQueue}>Add Queue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counters.map((counter) => (
          <Card key={counter.id} className={`hover-lift ${counter.paused ? "border-amber-500 opacity-70" : ""}`}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Monitor className="h-6 w-6 text-muted-foreground" />
                <CardTitle className="text-2xl font-bold">
                  {counter.name}
                </CardTitle>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleCounterPause(counter.id)}
                  className={counter.paused ? "text-green-500" : "text-amber-500"}
                >
                  {counter.paused ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </Button>
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
              {queues.filter(q => q.counter === counter.name && q.status !== "served").length === 0 ? (
                <p className="text-muted-foreground text-center">No active queues for this counter.</p>
              ) : (
                queues.filter(q => q.counter === counter.name && q.status !== "served").map((queue) => (
                  <div key={queue.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-semibold text-foreground">{queue.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Ticket: {queue.ticket} • ETA: {queue.eta} min
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePause(queue.id)}
                        className={queue.status === "paused" ? "text-green-500" : "text-amber-500"}
                        disabled={counter.paused}
                      >
                        {queue.status === "paused" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" onClick={() => handleCallNext(queue.id, queue.name, queue.ticket)} disabled={counter.paused}>
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleServe(queue.id, queue.name, queue.ticket)} disabled={counter.paused}>
                        <UserCheck className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Queue History</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyQueues.length === 0 ? (
          <p className="text-muted-foreground">No queues in history.</p>
        ) : (
          historyQueues.map((queue) => (
            <Card key={queue.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <History className="w-8 h-8 text-muted-foreground" />
                  <CardTitle>{queue.name}</CardTitle>
                  <Badge className="bg-gray-500 hover:bg-gray-600">Served</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Ticket: {queue.ticket}</p>
                <p className="text-sm text-muted-foreground">Counter: {queue.counter}</p>
                {queue.status === "served" && queue.endTime && (
                  <p className="text-sm text-muted-foreground">Served at: {new Date(queue.endTime).toLocaleTimeString()}</p>
                )}
                {queue.status !== "served" && (
                  <p className="text-sm text-muted-foreground">ETA: {queue.eta} min</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isNewQueueModalOpen} onOpenChange={setIsNewQueueModalOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Queue
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Queue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newQueueName}
                onChange={(e) => setNewQueueName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="counter" className="text-right">
                Counter
              </Label>
              <Select
                onValueChange={(value) => {
                  setNewQueueCounter(value);
                  setNewQueueEta(calculateEta(value, queues));
                }}
                value={newQueueCounter}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a counter" />
                </SelectTrigger>
                <SelectContent>
                  {activeCounters.map((counter) => (
                    <SelectItem key={counter.id} value={counter.name}>
                      {counter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket" className="text-right">
                Ticket
              </Label>
              <Input
                id="ticket"
                value={newQueueTicket}
                onChange={(e) => setNewQueueTicket(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eta" className="text-right">
                ETA (minutes)
              </Label>
              <Input
                id="eta"
                type="number"
                value={newQueueEta}
                readOnly // Make ETA read-only as it's generated
                className="col-span-3 bg-gray-100 dark:bg-gray-800"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="waiting" className="text-right">
                Waiting
              </Label>
              <Input
                id="waiting"
                type="number"
                value={newQueueWaiting}
                onChange={(e) => setNewQueueWaiting(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={newQueueStatus} onValueChange={(value: "active" | "paused" | "served" | "ongoing") => setNewQueueStatus(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="served">Served</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddNewQueue}>Add Queue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
