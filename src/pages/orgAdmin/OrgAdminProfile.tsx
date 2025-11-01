import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Organization } from "@/types/organization";
import { toast } from "sonner";

export default function OrgAdminProfile() {
  const { userType, organizationId } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // console.log("OrgAdminProfile: organizationId in useEffect", organizationId);

    const fetchOrganizationDetails = async () => {
      // console.log("OrgAdminProfile: Inside fetchOrganizationDetails, organizationId:", organizationId);
      setLoading(true);
      setError(null);

      if (!organizationId) {
        // console.log("OrgAdminProfile: No organizationId, returning early.");
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockOrg: Organization = {
        id: organizationId,
        name: "HDFC Bank - Dhanbad Branch",
        type: "Bank",
        location: "Main Road, Dhanbad",
        services: ["Withdraw", "Deposit", "Loan Office"],
        activeQueues: 5,
        avgWaitTime: "10 min",
        image: "https://via.placeholder.com/150",
      };

      // console.log("OrgAdminProfile: mockOrg generated:", mockOrg);

      if (mockOrg) {
        setOrganization(mockOrg);
      } else {
        setError("Organization not found with provided ID.");
      }
      setLoading(false);
    };

    fetchOrganizationDetails();
  }, [organizationId]);

  if (loading) {
    return <div className="text-center py-8">Loading organization details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!organization) {
    return <div className="text-center py-8">No organization details found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Organization Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-4">
            {organization.image && (
              <img
                src={organization.image}
                alt={organization.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
              />
            )}
          </div>
          <p className="text-lg text-center">Welcome, Organization Admin!</p>
          <p className="text-sm text-muted-foreground text-center">User Type: {userType}</p>

          <div className="mt-6 p-6 border rounded-lg bg-muted space-y-3">
            <h3 className="font-semibold text-xl mb-3">Organization Details:</h3>
            <p><strong>Name:</strong> {organization.name}</p>
            <p><strong>Type:</strong> {organization.type}</p>
            <p><strong>Location:</strong> {organization.location}</p>
            <p><strong>Contact Number:</strong> [Contact Number Placeholder]</p>
            <div>
              <strong>Services:</strong>
              <ul className="list-disc list-inside ml-4">
                {organization.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <p><strong>Active Queues:</strong> {organization.activeQueues}</p>
            <p><strong>Average Wait Time:</strong> {organization.avgWaitTime}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
