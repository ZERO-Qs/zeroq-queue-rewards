import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export interface Service {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

export interface JoinedQueue {
  id: string;
  organizationId: string;
  organizationName: string;
  serviceLabel: string;
  ticketNumber: string;
  eta: number;
  joinedAt: string;
}

interface QuickJoinModalProps {
  open: boolean;
  onClose: () => void;
  organizationName: string;
  organizationId: string;
  services: Service[];
}

interface JoinedQueue {
  id: string;
  organizationId: string;
  organizationName: string;
  serviceName: string;
  joinedAt: string;
}

export const QuickJoinModal: React.FC<QuickJoinModalProps> = ({
  open,
  onClose,
  organizationName,
  organizationId,
  services,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [joinedQueues, setJoinedQueues] = useState<JoinedQueue[]>([]);

  useEffect(() => {
    const storedQueues = localStorage.getItem("joinedQueues");
    if (storedQueues) {
      setJoinedQueues(JSON.parse(storedQueues));
    }
  }, []);

  useEffect(() => {
    if (joinedQueues.length > 0) {
      localStorage.setItem("joinedQueues", JSON.stringify(joinedQueues));
    }
  }, [joinedQueues]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    toast.success(`You have joined the queue for ${service.name} at ${organizationName}!`);

    const newJoinedQueue: JoinedQueue = {
      id: `${organizationId}-${service.name}-${Date.now()}`,
      organizationId,
      organizationName,
      serviceName: service.name,
      joinedAt: new Date().toISOString(),
    };

    setJoinedQueues((prevQueues) => [...prevQueues, newJoinedQueue]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Queue at {organizationName}</DialogTitle>
          <DialogDescription>
            Select a service to join the queue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {services.map((service) => (
            <Button
              key={service.name}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleServiceSelect(service)}
            >
              {service.name}
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
