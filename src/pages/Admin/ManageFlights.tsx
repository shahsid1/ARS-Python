
import React, { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy flight data
const initialFlights = [
  { 
    id: "FL001", 
    from: "Delhi", 
    to: "Mumbai", 
    departureTime: "10:00 AM", 
    arrivalTime: "12:00 PM", 
    flightDate: "2025-06-01", 
    airplane: "Boeing 737", 
    status: "Scheduled",
    basePrice: 5500
  },
  { 
    id: "FL002", 
    from: "Mumbai", 
    to: "Chennai", 
    departureTime: "2:00 PM", 
    arrivalTime: "4:00 PM", 
    flightDate: "2025-06-01", 
    airplane: "Airbus A320", 
    status: "Scheduled",
    basePrice: 4800
  },
  { 
    id: "FL003", 
    from: "Kolkata", 
    to: "Bangalore", 
    departureTime: "6:00 PM", 
    arrivalTime: "8:30 PM", 
    flightDate: "2025-06-02", 
    airplane: "Boeing 787", 
    status: "Scheduled",
    basePrice: 7200
  },
  { 
    id: "FL004", 
    from: "Chennai", 
    to: "Delhi", 
    departureTime: "8:00 AM", 
    arrivalTime: "10:30 AM", 
    flightDate: "2025-06-03", 
    airplane: "Airbus A380", 
    status: "Scheduled",
    basePrice: 8500
  },
  { 
    id: "FL005", 
    from: "Bangalore", 
    to: "Hyderabad", 
    departureTime: "12:00 PM", 
    arrivalTime: "1:30 PM", 
    flightDate: "2025-06-03", 
    airplane: "Boeing 737", 
    status: "Scheduled",
    basePrice: 3200
  },
];

// City options for select fields
const cities = [
  "Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", 
  "Hyderabad", "Ahmedabad", "Pune", "Jaipur"
];

// Airplane options for select fields
const airplanes = ["Boeing 737", "Airbus A320", "Boeing 787", "Airbus A380"];

// Status options
const statusOptions = ["Scheduled", "Delayed", "Cancelled", "Completed"];

const ManageFlights = () => {
  const [flights, setFlights] = useState(initialFlights);
  const [filteredFlights, setFilteredFlights] = useState(initialFlights);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for Add dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [newFlight, setNewFlight] = useState({
    id: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    flightDate: "",
    airplane: "",
    status: "Scheduled",
    basePrice: 0
  });
  
  // State for Update dialog
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateFlight, setUpdateFlight] = useState({
    id: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    flightDate: "",
    airplane: "",
    status: "",
    basePrice: 0
  });
  const [updateId, setUpdateId] = useState("");
  
  // State for Delete dialog
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  
  // State for alert messages
  const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredFlights(flights);
    } else {
      const filtered = flights.filter(flight => 
        flight.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFlights(filtered);
    }
  };

  // Handle input change for new flight
  const handleNewFlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFlight(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for new flight
  const handleNewFlightSelectChange = (name: string, value: string) => {
    setNewFlight(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle input change for update flight
  const handleUpdateFlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFlight(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for update flight
  const handleUpdateFlightSelectChange = (name: string, value: string) => {
    setUpdateFlight(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle flight addition
  const handleAddFlight = () => {
    // Basic validation
    if (!newFlight.id || !newFlight.from || !newFlight.to || 
        !newFlight.departureTime || !newFlight.arrivalTime || 
        !newFlight.flightDate || !newFlight.airplane) {
      setAlert({
        show: true,
        message: "Please fill all required fields",
        severity: "error"
      });
      return;
    }
    
    // Check if ID already exists
    if (flights.some(flight => flight.id === newFlight.id)) {
      setAlert({
        show: true,
        message: "Flight ID already exists",
        severity: "error"
      });
      return;
    }
    
    const updatedFlights = [...flights, newFlight];
    setFlights(updatedFlights);
    setFilteredFlights(updatedFlights);
    setOpenAdd(false);
    setAlert({
      show: true,
      message: "Flight added successfully!",
      severity: "success"
    });
    
    // Reset form
    setNewFlight({
      id: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      flightDate: "",
      airplane: "",
      status: "Scheduled",
      basePrice: 0
    });
  };
  
  // Handle find flight for update
  const handleFindForUpdate = () => {
    const flightToUpdate = flights.find(flight => flight.id === updateId);
    if (flightToUpdate) {
      setUpdateFlight(flightToUpdate);
    } else {
      setAlert({
        show: true,
        message: "Flight not found",
        severity: "error"
      });
    }
  };
  
  // Handle flight update
  const handleUpdateFlight = () => {
    // Basic validation
    if (!updateFlight.from || !updateFlight.to || 
        !updateFlight.departureTime || !updateFlight.arrivalTime || 
        !updateFlight.flightDate || !updateFlight.airplane) {
      setAlert({
        show: true,
        message: "Please fill all required fields",
        severity: "error"
      });
      return;
    }
    
    const updatedFlights = flights.map(flight => 
      flight.id === updateFlight.id ? updateFlight : flight
    );
    
    setFlights(updatedFlights);
    setFilteredFlights(updatedFlights);
    setOpenUpdate(false);
    setAlert({
      show: true,
      message: "Flight updated successfully!",
      severity: "success"
    });
    
    // Reset form
    setUpdateFlight({
      id: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      flightDate: "",
      airplane: "",
      status: "",
      basePrice: 0
    });
    setUpdateId("");
  };
  
  // Handle flight deletion
  const handleDeleteFlight = () => {
    if (!deleteId) {
      setAlert({
        show: true,
        message: "Please enter a flight ID",
        severity: "error"
      });
      return;
    }
    
    // Check if flight exists
    if (!flights.some(flight => flight.id === deleteId)) {
      setAlert({
        show: true,
        message: "Flight not found",
        severity: "error"
      });
      return;
    }
    
    const updatedFlights = flights.filter(flight => flight.id !== deleteId);
    setFlights(updatedFlights);
    setFilteredFlights(updatedFlights);
    setOpenDelete(false);
    setAlert({
      show: true,
      message: "Flight deleted successfully!",
      severity: "success"
    });
    
    // Reset form
    setDeleteId("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Flights</h1>
      
      {/* Alert message */}
      {alert.show && (
        <Alert className={`mb-4 ${alert.severity === "success" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}>
          <AlertDescription>
            {alert.message}
          </AlertDescription>
          <Button 
            variant="ghost" 
            className="ml-auto"
            onClick={() => setAlert({ ...alert, show: false })}
          >
            Close
          </Button>
        </Alert>
      )}
      
      {/* Search section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by flight ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button 
            variant="default" 
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      
      {/* Table of flights */}
      <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight ID</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Aircraft</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Base Price (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.from}</TableCell>
                <TableCell>{flight.to}</TableCell>
                <TableCell>{flight.flightDate}</TableCell>
                <TableCell>{flight.departureTime}</TableCell>
                <TableCell>{flight.arrivalTime}</TableCell>
                <TableCell>{flight.airplane}</TableCell>
                <TableCell>{flight.status}</TableCell>
                <TableCell>₹{flight.basePrice}</TableCell>
              </TableRow>
            ))}
            {filteredFlights.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">No flights found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Operation buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Button 
          variant="default"
          onClick={() => setOpenAdd(true)}
          className="bg-green-500 hover:bg-green-600"
        >
          Add New Flight
        </Button>
        <Button 
          variant="default"
          onClick={() => setOpenUpdate(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Update Flight
        </Button>
        <Button 
          variant="default"
          onClick={() => setOpenDelete(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete Flight
        </Button>
      </div>
      
      {/* Add Flight Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogHeader>
          <DialogTitle>Add New Flight</DialogTitle>
          <DialogDescription>
            Enter details to add a new flight to the system.
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="sm:max-w-[500px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">Flight ID</Label>
              <Input
                id="id"
                name="id"
                placeholder="Flight ID"
                value={newFlight.id}
                onChange={handleNewFlightChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select
                value={newFlight.from}
                onValueChange={(value) => handleNewFlightSelectChange("from", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select
                value={newFlight.to}
                onValueChange={(value) => handleNewFlightSelectChange("to", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flightDate">Flight Date</Label>
              <Input
                id="flightDate"
                name="flightDate"
                type="date"
                value={newFlight.flightDate}
                onChange={handleNewFlightChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                name="departureTime"
                placeholder="e.g., 10:00 AM"
                value={newFlight.departureTime}
                onChange={handleNewFlightChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <Input
                id="arrivalTime"
                name="arrivalTime"
                placeholder="e.g., 12:30 PM"
                value={newFlight.arrivalTime}
                onChange={handleNewFlightChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="airplane">Aircraft</Label>
              <Select
                value={newFlight.airplane}
                onValueChange={(value) => handleNewFlightSelectChange("airplane", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select aircraft" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {airplanes.map((plane) => (
                      <SelectItem key={plane} value={plane}>{plane}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (₹)</Label>
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                placeholder="Base price in INR"
                value={newFlight.basePrice}
                onChange={handleNewFlightChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddFlight}>Add Flight</Button>
        </DialogFooter>
      </Dialog>
      
      {/* Update Flight Dialog */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogHeader>
          <DialogTitle>Update Flight</DialogTitle>
          <DialogDescription>
            Enter the flight ID to find and update flight details.
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Enter Flight ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleFindForUpdate}>
              Find
            </Button>
          </div>
          
          {updateFlight.id && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="col-span-1 sm:col-span-2">
                <p className="font-medium">Update details for Flight: {updateFlight.id}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-from">From</Label>
                <Select
                  value={updateFlight.from}
                  onValueChange={(value) => handleUpdateFlightSelectChange("from", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-to">To</Label>
                <Select
                  value={updateFlight.to}
                  onValueChange={(value) => handleUpdateFlightSelectChange("to", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-flightDate">Flight Date</Label>
                <Input
                  id="update-flightDate"
                  name="flightDate"
                  type="date"
                  value={updateFlight.flightDate}
                  onChange={handleUpdateFlightChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-departureTime">Departure Time</Label>
                <Input
                  id="update-departureTime"
                  name="departureTime"
                  placeholder="e.g., 10:00 AM"
                  value={updateFlight.departureTime}
                  onChange={handleUpdateFlightChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-arrivalTime">Arrival Time</Label>
                <Input
                  id="update-arrivalTime"
                  name="arrivalTime"
                  placeholder="e.g., 12:30 PM"
                  value={updateFlight.arrivalTime}
                  onChange={handleUpdateFlightChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-airplane">Aircraft</Label>
                <Select
                  value={updateFlight.airplane}
                  onValueChange={(value) => handleUpdateFlightSelectChange("airplane", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select aircraft" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {airplanes.map((plane) => (
                        <SelectItem key={plane} value={plane}>{plane}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-status">Status</Label>
                <Select
                  value={updateFlight.status}
                  onValueChange={(value) => handleUpdateFlightSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-basePrice">Base Price (₹)</Label>
                <Input
                  id="update-basePrice"
                  name="basePrice"
                  type="number"
                  placeholder="Base price in INR"
                  value={updateFlight.basePrice}
                  onChange={handleUpdateFlightChange}
                />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenUpdate(false)}>Cancel</Button>
          {updateFlight.id && (
            <Button onClick={handleUpdateFlight}>Update Flight</Button>
          )}
        </DialogFooter>
      </Dialog>
      
      {/* Delete Flight Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogHeader>
          <DialogTitle>Delete Flight</DialogTitle>
          <DialogDescription>
            Enter the flight ID you want to delete. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Input
            placeholder="Enter Flight ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="w-full"
          />
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDeleteFlight}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ManageFlights;
