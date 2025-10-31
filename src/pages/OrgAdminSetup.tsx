import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function OrgAdminSetup() {
  const navigate = useNavigate();

  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

  const handleAddService = () => {
    if (newService.trim() !== "" && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setServices(services.filter((service) => service !== serviceToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would involve saving setup data to the backend
    console.log("Organization Setup Data:", {
      orgName,
      orgType,
      location,
      contactNumber,
      imageUrl,
      services,
    });

    try {
      const response = await fetch("/api/org-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orgName,
          orgType,
          location,
          contactNumber,
          imageUrl,
          services,
        }),
      });

      if (response.ok) {
        toast.success("Organization setup complete!");
        navigate("/org-admin");
      } else {
        const errorData = await response.json();
        toast.error("Setup failed", { description: errorData.message || "An error occurred." });
      }
    } catch (error) {
      console.error("Error during organization setup:", error);
      toast.error("Setup failed", { description: "Network error or server is unreachable." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Organization Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                type="text"
                placeholder="e.g., HDFC Bank"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgType">Organization Type</Label>
              <Input
                id="orgType"
                type="text"
                placeholder="e.g., Bank, Hospital, Government"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location/Address</Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Main Road, Dhanbad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="e.g., +91 9876543210"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="e.g., https://example.com/logo.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services">Services Offered</Label>
              <div className="flex space-x-2">
                <Input
                  id="services"
                  type="text"
                  placeholder="Add a service (e.g., Withdraw, Deposit)"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                />
                <Button type="button" onClick={handleAddService}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleRemoveService(service)}
                    >
                      x
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">Complete Setup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}