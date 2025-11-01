import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Counter {
  id: string;
  name: string;
  staff: string;
  status: "active" | "inactive";
  served: number;
  paused: boolean;
}

export default function OrgAdminCounters() {
  const [counters, setCounters] = useState<Counter[]>(() => {
    const savedCounters = localStorage.getItem("counters");
    return savedCounters ? JSON.parse(savedCounters) : [
      { id: "1", name: "Withdraw Counter 1", staff: "John Doe", status: "active", served: 23, paused: false },
      { id: "2", name: "Deposit Counter 2", staff: "Jane Smith", status: "active", served: 18, paused: false },
      { id: "3", name: "Loan Office", staff: "Bob Wilson", status: "inactive", served: 12, paused: false },
    ];
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCounter, setCurrentCounter] = useState<Counter | null>(null);
  const [newCounterName, setNewCounterName] = useState("");
  const [newCounterStaff, setNewCounterStaff] = useState("");
  const [newCounterStatus, setNewCounterStatus] = useState<"active" | "inactive">("active");
  const [newCounterPaused, setNewCounterPaused] = useState(false);

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const handleEditCounter = (id: string) => {
    const counterToEdit = counters.find((counter) => counter.id === id);
    if (counterToEdit) {
      setCurrentCounter(counterToEdit);
      setNewCounterName(counterToEdit.name);
      setNewCounterStaff(counterToEdit.staff);
      setNewCounterStatus(counterToEdit.status);
      setNewCounterPaused(counterToEdit.paused);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteCounter = (id: string) => {
    setCounters(counters.filter((counter) => counter.id !== id));
  };

  const handleSaveCounter = () => {
    if (currentCounter) {
      setCounters(counters.map((counter) =>
        counter.id === currentCounter.id
          ? { ...currentCounter, name: newCounterName, staff: newCounterStaff, status: newCounterStatus, paused: newCounterPaused }
          : counter
      ));
      setIsEditModalOpen(false);
      setCurrentCounter(null);
    }
  };

  const handleAddCounter = () => {
    const newId = (counters.length > 0 ? parseInt(counters[counters.length - 1].id) + 1 : 1).toString();
    const newCounter: Counter = {
      id: newId,
      name: newCounterName,
      staff: newCounterStaff,
      status: newCounterStatus,
      served: 0,
      paused: newCounterPaused,
    };
    setCounters([...counters, newCounter]);
    setIsAddModalOpen(false);
    setNewCounterName("");
    setNewCounterStaff("");
    setNewCounterStatus("active");
    setNewCounterPaused(false);
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentCounter) {
      setCurrentCounter({ ...currentCounter, [e.target.name]: e.target.value });
    }
  };

  const handleStatusChange = (value: "active" | "inactive") => {
    if (currentCounter) {
      setCurrentCounter({ ...currentCounter, status: value });
    }
  };

  const handlePausedChange = (checked: boolean) => {
    if (currentCounter) {
      setCurrentCounter({ ...currentCounter, paused: checked });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Counters</h1>
          <p className="text-muted-foreground">Configure and monitor service counters</p>
        </div>
        <Button className="gap-2" onClick={() => {
          setNewCounterName("");
          setNewCounterStaff("");
          setNewCounterStatus("active");
          setNewCounterPaused(false);
          setIsAddModalOpen(true);
        }}>
          <Plus className="w-4 h-4" />
          Add Counter
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counters.map((counter) => (
          <Card key={counter.id} className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Monitor className="w-8 h-8 text-primary" />
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
              <div>
                <h3 className="font-bold text-lg text-foreground">{counter.name}</h3>
                <p className="text-sm text-muted-foreground">Staff: {counter.staff}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-2xl font-bold text-foreground">{counter.served}</p>
                  <p className="text-xs text-muted-foreground">Served Today</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditCounter(counter.id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDeleteCounter(counter.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Counter</DialogTitle>
          </DialogHeader>
          {currentCounter && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentCounter.name}
                  onChange={handleCounterChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="staff" className="text-right">
                  Staff
                </Label>
                <Input
                  id="staff"
                  name="staff"
                  value={currentCounter.staff}
                  onChange={handleCounterChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={currentCounter.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paused" className="text-right">
                  Paused
                </Label>
                <input
                  type="checkbox"
                  id="paused"
                  name="paused"
                  checked={currentCounter.paused}
                  onChange={(e) => handlePausedChange(e.target.checked)}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveCounter}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Counter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newCounterName" className="text-right">
                Name
              </Label>
              <Input
                id="newCounterName"
                name="newCounterName"
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newCounterStaff" className="text-right">
                Staff
              </Label>
              <Input
                id="newCounterStaff"
                name="newCounterStaff"
                value={newCounterStaff}
                onChange={(e) => setNewCounterStaff(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newCounterStatus" className="text-right">
                Status
              </Label>
              <Select value={newCounterStatus} onValueChange={(value: "active" | "inactive") => setNewCounterStatus(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newCounterPaused" className="text-right">
                Paused
              </Label>
              <input
                type="checkbox"
                id="newCounterPaused"
                name="newCounterPaused"
                checked={newCounterPaused}
                onChange={(e) => setNewCounterPaused(e.target.checked)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddCounter}>Add Counter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
