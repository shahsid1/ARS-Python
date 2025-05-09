
import { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Ticket, Users, Calendar } from "lucide-react";
import CustomDialog from "@/components/ui/custom-dialog";

// Mock booking data
const mockBookings = [
  {
    id: "BK1001",
    customerName: "John Doe",
    customerId: "cust001",
    flightNumber: "SR101",
    source: "Delhi",
    destination: "Mumbai",
    date: "2024-05-10",
    status: "Confirmed",
    passengers: 2,
    amount: 11780,
    bookingDate: "2024-04-25",
  },
  {
    id: "BK1002",
    customerName: "Jane Smith",
    customerId: "cust002",
    flightNumber: "SR204",
    source: "Mumbai",
    destination: "Bangalore",
    date: "2024-05-15",
    status: "Pending",
    passengers: 1,
    amount: 5200,
    bookingDate: "2024-04-26",
  },
  {
    id: "BK1003",
    customerName: "Michael Johnson",
    customerId: "cust003",
    flightNumber: "SR305",
    source: "Delhi",
    destination: "Chennai",
    date: "2024-05-12",
    status: "Confirmed",
    passengers: 3,
    amount: 18900,
    bookingDate: "2024-04-20",
  },
  {
    id: "BK1004",
    customerName: "Emily Brown",
    customerId: "cust004",
    flightNumber: "SR155",
    source: "Bangalore",
    destination: "Hyderabad",
    date: "2024-05-20",
    status: "Cancelled",
    passengers: 2,
    amount: 8400,
    bookingDate: "2024-04-18",
  },
  {
    id: "BK1005",
    customerName: "John Doe",
    customerId: "cust001",
    flightNumber: "SR202",
    source: "Mumbai",
    destination: "Delhi",
    date: "2024-05-25",
    status: "Confirmed",
    passengers: 1,
    amount: 6450,
    bookingDate: "2024-04-23",
  },
];

const ManageBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter bookings based on search term
  useEffect(() => {
    if (searchTerm) {
      const filteredBookings = mockBookings.filter(booking => 
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBookings(filteredBookings);
    } else {
      setBookings(mockBookings);
    }
  }, [searchTerm]);

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Ticket className="h-4 w-4 text-primary" />
                      </div>
                      {booking.id}
                    </div>
                  </TableCell>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell>
                    <div>
                      <div>{booking.flightNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.source} → {booking.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">₹{booking.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(booking)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {selectedBooking && (
        <CustomDialog
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          title="Booking Details"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ticket className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{selectedBooking.id}</h2>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedBooking.status)}`}>
                {selectedBooking.status}
              </span>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Flight Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Flight Number</h4>
                      <p>{selectedBooking.flightNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Travel Date</h4>
                      <p>{selectedBooking.date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Source</h4>
                      <p>{selectedBooking.source}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Destination</h4>
                      <p>{selectedBooking.destination}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Customer & Booking Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Customer Name</h4>
                      <p>{selectedBooking.customerName}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Customer ID</h4>
                      <p>{selectedBooking.customerId}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Passengers</h4>
                      <p>{selectedBooking.passengers}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Booking Date</h4>
                      <p>{selectedBooking.bookingDate}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Total Amount</h4>
                      <p className="font-semibold">₹{selectedBooking.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Payment Status</h4>
                      <p>Paid</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CustomDialog>
      )}
    </div>
  );
};

export default ManageBookings;
