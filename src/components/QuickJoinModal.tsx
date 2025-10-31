import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface Service {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

interface QuickJoinModalProps {
  open: boolean;
  onClose: () => void;
  organizationName: string;
  services: Service[];
}

export const QuickJoinModal = ({ open, onClose, organizationName, services }: QuickJoinModalProps) => {
  const handleServiceSelect = (serviceLabel: string) => {
    // Simulate joining queue
    const ticketNumber = `A${Math.floor(Math.random() * 100) + 1}`;
    const eta = Math.floor(Math.random() * 15) + 3;
    
    toast.success(`Joined ${serviceLabel} Queue`, {
      description: `Ticket #${ticketNumber} • ETA ${eta} min`,
      duration: 4000,
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Choose Your Service</DialogTitle>
          <DialogDescription className="text-base">
            Quick join at {organizationName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.label)}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-all hover:shadow-md"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {service.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          You'll be added to the queue with the shortest wait time
        </p>
      </DialogContent>
    </Dialog>
  );
};
