
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

interface Booking {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengerCount: number;
  cabinClass: string;
  status: "Confirmed" | "Cancelled" | "Completed" | "Upcoming";
  price: number;
}

const mockBookings: Booking[] = [
  {
    id: "BK1001",
    flightNumber: "SK101",
    from: "Delhi",
    to: "Mumbai",
    departDate: "2025-05-15",
    returnDate: "2025-05-20",
    passengerCount: 2,
    cabinClass: "Economy",
    status: "Upcoming",
    price: 12500
  },
  {
    id: "BK1002",
    flightNumber: "SK205",
    from: "Bangalore",
    to: "Chennai",
    departDate: "2025-06-22",
    passengerCount: 1,
    cabinClass: "Business",
    status: "Confirmed",
    price: 18750
  },
  {
    id: "BK1003",
    flightNumber: "SK308",
    from: "Mumbai",
    to: "Delhi",
    departDate: "2025-04-10",
    passengerCount: 3,
    cabinClass: "Economy",
    status: "Completed",
    price: 15000
  },
  {
    id: "BK1004",
    flightNumber: "SK412",
    from: "Kolkata",
    to: "Hyderabad",
    departDate: "2025-03-05",
    returnDate: "2025-03-12",
    passengerCount: 2,
    cabinClass: "Premium Economy",
    status: "Cancelled",
    price: 22000
  }
];

const CustomerBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    // Filter bookings based on search term and active tab
    let filtered = bookings;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        booking =>
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.to.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(booking => 
        booking.status.toLowerCase() === activeTab.toLowerCase()
      );
    }
    
    setFilteredBookings(filtered);
  }, [searchTerm, activeTab, bookings]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>
                View and manage all your flight bookings
              </CardDescription>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderBookingsTable(filteredBookings, getStatusColor)}
            </TabsContent>
            <TabsContent value="upcoming">
              {renderBookingsTable(filteredBookings, getStatusColor)}
            </TabsContent>
            <TabsContent value="confirmed">
              {renderBookingsTable(filteredBookings, getStatusColor)}
            </TabsContent>
            <TabsContent value="completed">
              {renderBookingsTable(filteredBookings, getStatusColor)}
            </TabsContent>
            <TabsContent value="cancelled">
              {renderBookingsTable(filteredBookings, getStatusColor)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const renderBookingsTable = (bookings: Booking[], getStatusColor: (status: string) => string) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Flight</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Passengers</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.flightNumber}</TableCell>
              <TableCell>
                {booking.from} → {booking.to}
              </TableCell>
              <TableCell>
                {booking.departDate}
                {booking.returnDate && <div className="text-xs text-muted-foreground">Return: {booking.returnDate}</div>}
              </TableCell>
              <TableCell>{booking.cabinClass}</TableCell>
              <TableCell>{booking.passengerCount}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>₹{booking.price.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  {(booking.status === "Confirmed" || booking.status === "Upcoming") && (
                    <Button variant="destructive" size="sm">Cancel</Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerBookings;
