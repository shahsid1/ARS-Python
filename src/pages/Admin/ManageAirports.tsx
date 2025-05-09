
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Dummy airport data
const initialAirports = [
  { 
    id: "DEL", 
    name: "Indira Gandhi International Airport", 
    city: "Delhi", 
    terminals: 3,
    domestic: true,
    international: true
  },
  { 
    id: "BOM", 
    name: "Chhatrapati Shivaji International Airport", 
    city: "Mumbai", 
    terminals: 2,
    domestic: true,
    international: true
  },
  { 
    id: "MAA", 
    name: "Chennai International Airport", 
    city: "Chennai", 
    terminals: 2,
    domestic: true,
    international: true
  },
  { 
    id: "BLR", 
    name: "Kempegowda International Airport", 
    city: "Bangalore", 
    terminals: 2,
    domestic: true,
    international: true
  },
  { 
    id: "CCU", 
    name: "Netaji Subhas Chandra Bose International Airport", 
    city: "Kolkata", 
    terminals: 2,
    domestic: true,
    international: true
  },
];

const ManageAirports = () => {
  const [airports, setAirports] = useState(initialAirports);
  const [filteredAirports, setFilteredAirports] = useState(initialAirports);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for Add dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [newAirport, setNewAirport] = useState({
    id: "",
    name: "",
    city: "",
    terminals: 1,
    domestic: true,
    international: false
  });
  
  // State for Update dialog
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateAirport, setUpdateAirport] = useState({
    id: "",
    name: "",
    city: "",
    terminals: 0,
    domestic: false,
    international: false
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
      setFilteredAirports(airports);
    } else {
      const filtered = airports.filter(airport => 
        airport.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAirports(filtered);
    }
  };

  // Handle input change for new airport
  const handleNewAirportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewAirport(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle input change for update airport
  const handleUpdateAirportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUpdateAirport(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle checkbox change for new airport
  const handleNewAirportCheckboxChange = (field: string, checked: boolean) => {
    setNewAirport(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  // Handle checkbox change for update airport
  const handleUpdateAirportCheckboxChange = (field: string, checked: boolean) => {
    setUpdateAirport(prev => ({
      ...prev,
      [field]: checked
    }));
  };
  
  // Handle airport addition
  const handleAddAirport = () => {
    // Basic validation
    if (!newAirport.id || !newAirport.name || !newAirport.city) {
      setAlert({
        show: true,
        message: "Please fill all required fields",
        severity: "error"
      });
      return;
    }
    
    // Check if ID already exists
    if (airports.some(airport => airport.id === newAirport.id)) {
      setAlert({
        show: true,
        message: "Airport ID already exists",
        severity: "error"
      });
      return;
    }
    
    const updatedAirports = [...airports, newAirport];
    setAirports(updatedAirports);
    setFilteredAirports(updatedAirports);
    setOpenAdd(false);
    setAlert({
      show: true,
      message: "Airport added successfully!",
      severity: "success"
    });
    
    // Reset form
    setNewAirport({
      id: "",
      name: "",
      city: "",
      terminals: 1,
      domestic: true,
      international: false
    });
  };
  
  // Handle find airport for update
  const handleFindForUpdate = () => {
    const airportToUpdate = airports.find(airport => airport.id === updateId);
    if (airportToUpdate) {
      setUpdateAirport(airportToUpdate);
    } else {
      setAlert({
        show: true,
        message: "Airport not found",
        severity: "error"
      });
    }
  };
  
  // Handle airport update
  const handleUpdateAirport = () => {
    // Basic validation
    if (!updateAirport.name || !updateAirport.city) {
      setAlert({
        show: true,
        message: "Please fill all required fields",
        severity: "error"
      });
      return;
    }
    
    const updatedAirports = airports.map(airport => 
      airport.id === updateAirport.id ? updateAirport : airport
    );
    
    setAirports(updatedAirports);
    setFilteredAirports(updatedAirports);
    setOpenUpdate(false);
    setAlert({
      show: true,
      message: "Airport updated successfully!",
      severity: "success"
    });
    
    // Reset form
    setUpdateAirport({
      id: "",
      name: "",
      city: "",
      terminals: 0,
      domestic: false,
      international: false
    });
    setUpdateId("");
  };
  
  // Handle airport deletion
  const handleDeleteAirport = () => {
    if (!deleteId) {
      setAlert({
        show: true,
        message: "Please enter an airport ID",
        severity: "error"
      });
      return;
    }
    
    // Check if airport exists
    if (!airports.some(airport => airport.id === deleteId)) {
      setAlert({
        show: true,
        message: "Airport not found",
        severity: "error"
      });
      return;
    }
    
    const updatedAirports = airports.filter(airport => airport.id !== deleteId);
    setAirports(updatedAirports);
    setFilteredAirports(updatedAirports);
    setOpenDelete(false);
    setAlert({
      show: true,
      message: "Airport deleted successfully!",
      severity: "success"
    });
    
    // Reset form
    setDeleteId("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Airports</h1>
      
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
            placeholder="Search by airport ID"
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
      
      {/* Table of airports */}
      <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Airport ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Terminals</TableHead>
              <TableHead>Domestic</TableHead>
              <TableHead>International</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAirports.map((airport) => (
              <TableRow key={airport.id}>
                <TableCell>{airport.id}</TableCell>
                <TableCell>{airport.name}</TableCell>
                <TableCell>{airport.city}</TableCell>
                <TableCell>{airport.terminals}</TableCell>
                <TableCell>{airport.domestic ? "Yes" : "No"}</TableCell>
                <TableCell>{airport.international ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
            {filteredAirports.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">No airports found</TableCell>
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
          Add New Airport
        </Button>
        <Button 
          variant="default"
          onClick={() => setOpenUpdate(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Update Airport
        </Button>
        <Button 
          variant="default"
          onClick={() => setOpenDelete(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete Airport
        </Button>
      </div>
      
      {/* Add Airport Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogHeader>
          <DialogTitle>Add New Airport</DialogTitle>
          <DialogDescription>
            Enter details to add a new airport to the system.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">Airport ID (IATA Code)</Label>
              <Input
                id="id"
                name="id"
                placeholder="3-letter IATA code (e.g., DEL)"
                value={newAirport.id}
                onChange={handleNewAirportChange}
              />
              <p className="text-sm text-gray-500">3-letter IATA code (e.g., DEL for Delhi)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Airport Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Full airport name"
                value={newAirport.name}
                onChange={handleNewAirportChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="City name"
                value={newAirport.city}
                onChange={handleNewAirportChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="terminals">Number of Terminals</Label>
              <Input
                id="terminals"
                name="terminals"
                type="number"
                placeholder="Number of terminals"
                value={newAirport.terminals}
                onChange={handleNewAirportChange}
                min={1}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="domestic" 
                checked={newAirport.domestic} 
                onCheckedChange={(checked) => 
                  handleNewAirportCheckboxChange("domestic", checked === true)
                }
              />
              <Label htmlFor="domestic">Domestic Flights</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="international" 
                checked={newAirport.international} 
                onCheckedChange={(checked) => 
                  handleNewAirportCheckboxChange("international", checked === true)
                }
              />
              <Label htmlFor="international">International Flights</Label>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddAirport}>Add Airport</Button>
        </DialogFooter>
      </Dialog>
      
      {/* Update Airport Dialog */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogHeader>
          <DialogTitle>Update Airport</DialogTitle>
          <DialogDescription>
            Enter the airport ID to find and update airport details.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Enter Airport ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleFindForUpdate}>
              Find
            </Button>
          </div>
          
          {updateAirport.id && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1 md:col-span-2">
                <p className="font-medium">Update details for Airport: {updateAirport.id}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-name">Airport Name</Label>
                <Input
                  id="update-name"
                  name="name"
                  placeholder="Full airport name"
                  value={updateAirport.name}
                  onChange={handleUpdateAirportChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-city">City</Label>
                <Input
                  id="update-city"
                  name="city"
                  placeholder="City name"
                  value={updateAirport.city}
                  onChange={handleUpdateAirportChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-terminals">Number of Terminals</Label>
                <Input
                  id="update-terminals"
                  name="terminals"
                  type="number"
                  placeholder="Number of terminals"
                  value={updateAirport.terminals}
                  onChange={handleUpdateAirportChange}
                  min={1}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="update-domestic" 
                  checked={updateAirport.domestic}
                  onCheckedChange={(checked) => 
                    handleUpdateAirportCheckboxChange("domestic", checked === true)
                  }
                />
                <Label htmlFor="update-domestic">Domestic Flights</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="update-international" 
                  checked={updateAirport.international}
                  onCheckedChange={(checked) => 
                    handleUpdateAirportCheckboxChange("international", checked === true)
                  }
                />
                <Label htmlFor="update-international">International Flights</Label>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenUpdate(false)}>Cancel</Button>
          {updateAirport.id && (
            <Button onClick={handleUpdateAirport}>Update Airport</Button>
          )}
        </DialogFooter>
      </Dialog>
      
      {/* Delete Airport Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogHeader>
          <DialogTitle>Delete Airport</DialogTitle>
          <DialogDescription>
            Enter the airport ID you want to delete. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Input
            placeholder="Enter Airport ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="w-full"
          />
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDeleteAirport}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ManageAirports;
