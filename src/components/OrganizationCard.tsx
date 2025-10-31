import { Building2, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface OrganizationCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  services: string[];
  activeQueues: number;
  avgWaitTime: string;
  image: string;
  onQuickJoin: () => void;
}

export const OrganizationCard = ({
  id,
  name,
  type,
  location,
  services,
  activeQueues,
  avgWaitTime,
  image,
  onQuickJoin,
}: OrganizationCardProps) => {
  return (
    <Card className="hover-lift overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
          {type}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {location}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {services.map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{activeQueues} Active</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{avgWaitTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-3 border-t">
        <Button variant="outline" className="flex-1" asChild>
          <Link to={`/organization/${id}`}>Schedule Visit</Link>
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90" 
          onClick={onQuickJoin}
        >
          Quick Join
        </Button>
      </CardFooter>
    </Card>
  );
};
