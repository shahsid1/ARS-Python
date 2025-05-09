
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock customer queries
const customerQueries = [
  {
    id: "Q1001",
    customer: "Priya Sharma",
    email: "priya.sharma@example.com",
    subject: "Flight Cancellation Refund",
    message: "I had booked flight SR-456 for May 10th which was cancelled. I haven't received my refund yet. It's been more than 2 weeks now. Can you please check the status?",
    date: "2025-04-25",
    status: "pending",
    priority: "high"
  },
  {
    id: "Q1002",
    customer: "Rahul Kumar",
    email: "rahul.k@example.com",
    subject: "Baggage Allowance Query",
    message: "I'm traveling with my family next month and wanted to know if the baggage allowance is combined for all tickets or if it's per person. Also, what are the charges for extra baggage?",
    date: "2025-04-26",
    status: "pending",
    priority: "medium"
  },
  {
    id: "Q1003",
    customer: "Ananya Patel",
    email: "ananya.p@example.com",
    subject: "Website Technical Issue",
    message: "I'm trying to book a ticket on your website but keep getting an error at the payment page. The error says 'Transaction Failed' even though my card has sufficient funds. Please help.",
    date: "2025-04-27",
    status: "pending",
    priority: "high"
  },
  {
    id: "Q1004",
    customer: "Vikram Singh",
    email: "vikram.s@example.com",
    subject: "Flight Schedule Change",
    message: "I received an email about a schedule change for my flight SR-789 on June 5th. The new timings don't work for me. What are my options? Can I get a full refund if I cancel?",
    date: "2025-04-28",
    status: "pending",
    priority: "medium"
  },
  {
    id: "Q1005",
    customer: "Deepa Reddy",
    email: "deepa.r@example.com",
    subject: "Seat Selection Issue",
    message: "I paid extra for a window seat but when I checked in, I was assigned an aisle seat. I need the window seat due to medical reasons. How can this be resolved?",
    date: "2025-04-29",
    status: "pending",
    priority: "low"
  },
];

// Mock resolved queries
const resolvedQueries = [
  {
    id: "Q996",
    customer: "Arjun Mehta",
    email: "arjun.m@example.com",
    subject: "Flight Upgrade Request",
    message: "Is there any way to upgrade my economy ticket to business class for flight SR-123 on May 5th? How much would it cost?",
    date: "2025-04-20",
    status: "resolved",
    priority: "medium",
    response: "Thank you for your inquiry. Yes, you can upgrade to business class. The cost would be ₹15,000 extra. You can do this through the 'Manage Booking' section on our website or by calling our customer service.",
    respondedBy: "Admin User",
    respondedDate: "2025-04-21"
  },
  {
    id: "Q997",
    customer: "Meera Iyer",
    email: "meera.i@example.com",
    subject: "Special Meal Request",
    message: "I forgot to add a special meal request for my upcoming flight. Is it still possible to request a vegetarian meal?",
    date: "2025-04-22",
    status: "resolved",
    priority: "low",
    response: "Yes, you can still request a special meal. Please go to 'Manage Booking' on our website and select the vegetarian meal option. Please note that special meal requests should be made at least 24 hours before departure.",
    respondedBy: "Admin User",
    respondedDate: "2025-04-22"
  }
];

const AdminCustomerSupport = () => {
  const [currentTab, setCurrentTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQueries, setFilteredQueries] = useState(customerQueries);
  const [filteredResolved, setFilteredResolved] = useState(resolvedQueries);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredQueries(customerQueries);
      setFilteredResolved(resolvedQueries);
    } else {
      const term = searchTerm.toLowerCase();
      
      const filteredPending = customerQueries.filter(
        query => 
          query.customer.toLowerCase().includes(term) || 
          query.subject.toLowerCase().includes(term) || 
          query.email.toLowerCase().includes(term) ||
          query.id.toLowerCase().includes(term)
      );
      
      const filteredCompleted = resolvedQueries.filter(
        query => 
          query.customer.toLowerCase().includes(term) || 
          query.subject.toLowerCase().includes(term) || 
          query.email.toLowerCase().includes(term) ||
          query.id.toLowerCase().includes(term)
      );
      
      setFilteredQueries(filteredPending);
      setFilteredResolved(filteredCompleted);
    }
  }, [searchTerm]);

  const handleViewQuery = (query: any) => {
    setSelectedQuery(query);
  };

  const handleRespondClick = () => {
    if (selectedQuery) {
      setResponseDialogOpen(true);
    }
  };

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      toast.error("Please enter a response");
      return;
    }
    
    // In a real app, we would make an API call here
    toast.success("Response sent successfully");
    
    // Mock the resolution process
    const updatedResolved = [
      {
        ...selectedQuery,
        status: "resolved",
        response: responseText,
        respondedBy: "Admin User",
        respondedDate: new Date().toISOString().split('T')[0]
      },
      ...resolvedQueries
    ];
    
    const updatedPending = customerQueries.filter(q => q.id !== selectedQuery.id);
    
    // Update the state
    setFilteredResolved(updatedResolved);
    setFilteredQueries(updatedPending);
    setResponseDialogOpen(false);
    setResponseText("");
    setSelectedQuery(null);
    
    // Switch to resolved tab
    setCurrentTab("resolved");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Support Management</h1>
      
      <div className="mb-6">
        <Input
          placeholder="Search queries by ID, customer name, email or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Customer Queries</CardTitle>
            <CardDescription>
              {currentTab === "pending" 
                ? "Unanswered queries that need response" 
                : "Previously resolved customer issues"}
            </CardDescription>
            
            <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending">
                  Pending ({filteredQueries.length})
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved ({filteredResolved.length})
                </TabsTrigger>
              </TabsList>
            
              <TabsContent value="pending" className="m-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredQueries.length > 0 ? (
                    filteredQueries.map((query) => (
                      <div
                        key={query.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedQuery?.id === query.id ? "bg-primary/10" : ""
                        }`}
                        onClick={() => handleViewQuery(query)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{query.subject}</p>
                            <p className="text-sm text-gray-500">
                              {query.customer} • {query.date}
                            </p>
                          </div>
                          <Badge 
                            variant={query.priority === "high" ? "destructive" : 
                                  query.priority === "medium" ? "default" : "outline"}
                          >
                            {query.priority}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{query.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">No pending queries found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="resolved" className="m-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredResolved.length > 0 ? (
                    filteredResolved.map((query) => (
                      <div
                        key={query.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedQuery?.id === query.id ? "bg-primary/10" : ""
                        }`}
                        onClick={() => handleViewQuery(query)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{query.subject}</p>
                            <p className="text-sm text-gray-500">
                              {query.customer} • {query.date}
                            </p>
                          </div>
                          <Badge variant="success">Resolved</Badge>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{query.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">No resolved queries found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Empty content since we moved the tabs content up */}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedQuery ? "Query Details" : "Select a Query"}
            </CardTitle>
            {selectedQuery && (
              <CardDescription>
                Query ID: {selectedQuery.id} • Submitted: {selectedQuery.date}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!selectedQuery ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Select a query from the list to view details</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg">{selectedQuery.subject}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm">From: <span className="font-medium">{selectedQuery.customer}</span> ({selectedQuery.email})</p>
                    <Badge 
                      variant={
                        selectedQuery.status === "resolved" ? "success" :
                        selectedQuery.priority === "high" ? "destructive" : 
                        selectedQuery.priority === "medium" ? "default" : "outline"
                      }
                    >
                      {selectedQuery.status === "resolved" ? "Resolved" : selectedQuery.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Message:</h4>
                  <p>{selectedQuery.message}</p>
                </div>
                
                {selectedQuery.status === "resolved" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Response:</h4>
                    <p>{selectedQuery.response}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      Responded by {selectedQuery.respondedBy} on {selectedQuery.respondedDate}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          {selectedQuery && selectedQuery.status !== "resolved" && (
            <CardFooter>
              <Button onClick={handleRespondClick} className="w-full">
                Respond to Query
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Respond to Query</DialogTitle>
            <DialogDescription>
              Your response will be sent to {selectedQuery?.customer} and marked as resolved.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <h4 className="text-sm font-medium mb-1">Query:</h4>
              <p className="text-sm bg-gray-50 p-2 rounded">{selectedQuery?.message}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Your Response:</h4>
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your response here..."
                className="min-h-[150px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitResponse}>
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomerSupport;
