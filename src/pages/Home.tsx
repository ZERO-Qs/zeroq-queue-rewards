import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { OrganizationCard } from "@/components/OrganizationCard";
import { QuickJoinModal } from "@/components/QuickJoinModal";
import type { Service, JoinedQueue } from "@/components/QuickJoinModal";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data
const organizations = [
  {
    id: "1",
    name: "HDFC Bank - Dhanbad Branch",
    type: "Bank",
    location: "Main Road, Dhanbad",
    services: ["Withdraw", "Deposit", "Loan Office"],
    activeQueues: 3,
    avgWaitTime: "8 min",
    image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80",
  },
  {
    id: "2",
    name: "Apollo Hospital",
    type: "Hospital",
    location: "Medical District, Dhanbad",
    services: ["OPD", "Lab Tests", "Pharmacy"],
    activeQueues: 5,
    avgWaitTime: "12 min",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    id: "3",
    name: "RTO Office Dhanbad",
    type: "Government",
    location: "Civil Lines, Dhanbad",
    services: ["DL Issue", "Vehicle Registration", "License Renewal"],
    activeQueues: 4,
    avgWaitTime: "15 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: "4",
    name: "State Bank of India",
    type: "Bank",
    location: "Bank More, Dhanbad",
    services: ["Withdraw", "Deposit", "Account Services"],
    activeQueues: 3,
    avgWaitTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224311-beee2169ff7b?w=800&q=80",
  },
  {
    id: "5",
    name: "Max Healthcare",
    type: "Hospital",
    location: "Saraidhela, Dhanbad",
    services: ["OPD", "Emergency", "Diagnostics"],
    activeQueues: 6,
    avgWaitTime: "10 min",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
  },
  {
    id: "6",
    name: "ICICI Bank",
    type: "Bank",
    location: "Hirapur, Dhanbad",
    services: ["Withdraw", "Deposit", "Loan Office"],
    activeQueues: 2,
    avgWaitTime: "5 min",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
  },
  {
    id: "7",
    name: "ABCDEF Bank",
    type: "Bank",
    location: "Hirapur, Dhanbad",
    services: ["Withdraw", "Deposit", "OPD"],
    activeQueues: 2,
    avgWaitTime: "5 min",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
  },
];



export default function Home() {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedOrgServices, setSelectedOrgServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedQueues, setJoinedQueues] = useState<JoinedQueue[]>([]);

  useEffect(() => {
    const storedQueues = localStorage.getItem("joinedQueues");
    if (storedQueues) {
      setJoinedQueues(JSON.parse(storedQueues));
    }
  }, []);

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrgName = organizations.find(org => org.id === selectedOrg)?.name || "";

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-b">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Smarter Queues
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Happier People
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join queues digitally. Skip the wait. Earn rewards for every visit.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search banks, hospitals, government offices..."
                className="pl-12 pr-4 py-6 text-base rounded-xl shadow-md border-2 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Organizations Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Organizations Near You</h2>
                <p className="text-muted-foreground mt-1">
                  {filteredOrgs.length} locations available
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 animate-slide-up">
              {filteredOrgs.map((org) => (
                <OrganizationCard
                  key={org.id}
                  {...org}
                  onQuickJoin={(services) => {
                    setSelectedOrg(org.id);
                    setSelectedOrgServices(services);
                  }}
                  hasJoinedQueue={joinedQueues.some(q => q.organizationId === org.id)}
                />
              ))}
            </div>

            {filteredOrgs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No organizations found matching your search.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">


              <div className="bg-gradient-to-br from-[hsl(var(--how-it-works-background-from))] to-[hsl(var(--how-it-works-background-to))] border border-[hsl(var(--how-it-works-border))] rounded-2xl p-6">
                <h3 className="font-bold text-[hsl(var(--how-it-works-text-foreground))] mb-2">How it works</h3>
                <ul className="space-y-2 text-sm text-[hsl(var(--how-it-works-text-muted-foreground))]">
                  <li className="flex gap-2">
                    <span className="text-[hsl(var(--how-it-works-text-primary))] font-bold">1.</span>
                    <span>Choose an organization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>Join the queue digitally</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>Get notified when it's your turn</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>Earn ZQT tokens as rewards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Join Modal */}
      <QuickJoinModal
        open={!!selectedOrg}
        onClose={() => {
          setSelectedOrg(null);
          setSelectedOrgServices([]);
        }}
        organizationName={selectedOrgName}
        organizationId={selectedOrg || ""}
        services={selectedOrgServices}
      />
    </div>
  );
}
