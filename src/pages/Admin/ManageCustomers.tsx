
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
import { Search, UserRound } from "lucide-react";
import CustomDialog from "@/components/ui/custom-dialog";

// Mock customer data
const mockCustomers = [
  {
    id: "cust001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    bookings: 3,
    wallet: 12500,
    status: "Active",
    joinedDate: "2024-02-15",
  },
  {
    id: "cust002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 87654 32109",
    bookings: 1,
    wallet: 5000,
    status: "Active",
    joinedDate: "2024-03-22",
  },
  {
    id: "cust003",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+91 76543 21098",
    bookings: 5,
    wallet: 20000,
    status: "Inactive",
    joinedDate: "2024-01-10",
  },
  {
    id: "cust004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    phone: "+91 65432 10987",
    bookings: 2,
    wallet: 8000,
    status: "Active",
    joinedDate: "2024-04-05",
  },
  {
    id: "cust005",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+91 54321 09876",
    bookings: 0,
    wallet: 0,
    status: "Pending",
    joinedDate: "2024-04-20",
  }
];

const ManageCustomers = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter customers based on search term
  useEffect(() => {
    if (searchTerm) {
      const filteredCustomers = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCustomers(filteredCustomers);
    } else {
      setCustomers(mockCustomers);
    }
  }, [searchTerm]);

  const handleViewDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Total Bookings</TableHead>
                <TableHead className="text-center">Wallet Balance</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <UserRound className="h-4 w-4 text-primary" />
                      </div>
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{customer.bookings}</TableCell>
                  <TableCell className="text-center">₹{customer.wallet.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{customer.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(customer)}
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

      {selectedCustomer && (
        <CustomDialog
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          title="Customer Details"
        >
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <UserRound className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCustomer.status)}`}>
                {selectedCustomer.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p>{selectedCustomer.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                <p>{selectedCustomer.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
                <p>{selectedCustomer.bookings}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Wallet Balance</h3>
                <p>₹{selectedCustomer.wallet.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Joined Date</h3>
                <p>{selectedCustomer.joinedDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Customer ID</h3>
                <p>{selectedCustomer.id}</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-md font-semibold mb-2">Recent Bookings</h3>
              {selectedCustomer.bookings > 0 ? (
                <div className="text-sm text-muted-foreground">
                  Customer booking history available in Booking Details section.
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No booking history available.</div>
              )}
            </div>
          </div>
        </CustomDialog>
      )}
    </div>
  );
};

export default ManageCustomers;
