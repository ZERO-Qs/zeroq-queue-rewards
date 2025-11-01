import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Mock queue data
const queueData = {
  "1": {
    name: "HDFC Bank - Dhanbad Branch",
    location: "Main Road, Dhanbad",
    queues: [
      { id: "q1", name: "Withdraw Counter 1", service: "Withdraw", eta: "6 min", waiting: 5, category: "cash" },
      { id: "q2", name: "Withdraw Counter 2", service: "Withdraw", eta: "8 min", waiting: 7, category: "cash" },
      { id: "q3", name: "Deposit Counter 1", service: "Deposit", eta: "4 min", waiting: 3, category: "deposit" },
      { id: "q4", name: "Loan Office", service: "Loan", eta: "15 min", waiting: 2, category: "loan" },
    ],
  },
};

const categoryColors = {
  cash: "from-green-500 to-emerald-600",
  deposit: "from-blue-500 to-cyan-600",
  loan: "from-purple-500 to-pink-600",
};

export default function Organization() {
  const { id } = useParams();
  const org = queueData[id as keyof typeof queueData];

  if (!org) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Organization not found</h1>
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleJoinQueue = (queueName: string, eta: string) => {
    const ticketNumber = `A${Math.floor(Math.random() * 100) + 1}`;
    toast.success(`Joined ${queueName}`, {
      description: `Ticket #${ticketNumber} • ETA ${eta}`,
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Organizations
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{org.name}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {org.location}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Queues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{org.queues.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Waiting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {org.queues.reduce((sum, q) => sum + q.waiting, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">8 min</p>
            </CardContent>
          </Card>
        </div>

        {/* Queue Cards Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Queues</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {org.queues.map((queue) => (
              <Card key={queue.id} className="hover-lift overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${categoryColors[queue.category as keyof typeof categoryColors]}`} />
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{queue.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {queue.service}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">ETA</p>
                        <p className="font-semibold text-foreground">{queue.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Waiting</p>
                        <p className="font-semibold text-foreground">{queue.waiting}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => handleJoinQueue(queue.name, queue.eta)}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join This Queue
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
