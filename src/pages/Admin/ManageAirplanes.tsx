
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

// Dummy airplane data
const initialAirplanes = [
  { 
    id: "AP001", 
    model: "Boeing 737-800", 
    manufacturer: "Boeing", 
    capacity: 180,
    economySeats: 162,
    businessSeats: 12,
    firstClassSeats: 6,
    manufactureYear: 2018,
    lastMaintenance: "2025-01-15"
  },
  { 
    id: "AP002", 
    model: "Airbus A320neo", 
    manufacturer: "Airbus", 
    capacity: 190,
    economySeats: 165,
    businessSeats: 20,
    firstClassSeats: 5,
    manufactureYear: 2019,
    lastMaintenance: "2025-02-20"
  },
  { 
    id: "AP003", 
    model: "Boeing 787-9", 
    manufacturer: "Boeing", 
    capacity: 290,
    economySeats: 250,
    businessSeats: 28,
    firstClassSeats: 12,
    manufactureYear: 2017,
    lastMaintenance: "2024-12-10"
  },
  { 
    id: "AP004", 
    model: "Airbus A380-800", 
    manufacturer: "Airbus", 
    capacity: 525,
    economySeats: 420,
    businessSeats: 80,
    firstClassSeats: 25,
    manufactureYear: 2015,
    lastMaintenance: "2025-03-05"
  },
  { 
    id: "AP005", 
    model: "Boeing 777-300ER", 
    manufacturer: "Boeing", 
    capacity: 350,
    economySeats: 286,
    businessSeats: 48,
    firstClassSeats: 16,
    manufactureYear: 2016,
    lastMaintenance: "2025-01-30"
  }
];

// Manufacturer options for select fields
const manufacturers = ["Boeing", "Airbus", "Embraer", "Bombardier"];

// Model options by manufacturer
const modelsByManufacturer = {
  Boeing: ["737-700", "737-800", "737 MAX 8", "777-200ER", "777-300ER", "787-8", "787-9"],
  Airbus: ["A319", "A320", "A320neo", "A321", "A330-300", "A350-900", "A380-800"],
  Embraer: ["E170", "E175", "E190", "E195"],
  Bombardier: ["CRJ700", "CRJ900", "Q400"]
};

const ManageAirplanes = () => {
  const [airplanes, setAirplanes] = useState(initialAirplanes);
  const [filteredAirplanes, setFilteredAirplanes] = useState(initialAirplanes);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Helper function to format current date as YYYY-MM-DD
  function format(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // State for Add dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [newAirplane, setNewAirplane] = useState({
    id: "",
    model: "",
    manufacturer: "",
    capacity: 0,
    economySeats: 0,
    businessSeats: 0,
    firstClassSeats: 0,
    manufactureYear: new Date().getFullYear(),
    lastMaintenance: format(new Date())
  });
  
  // State for Update dialog
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateAirplane, setUpdateAirplane] = useState({
    id: "",
    model: "",
    manufacturer: "",
    capacity: 0,
    economySeats: 0,
    businessSeats: 0,
    firstClassSeats: 0,
    manufactureYear: 0,
    lastMaintenance: ""
  });
  const [updateId, setUpdateId] = useState("");
  
  // State for Delete dialog
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  
  // State for alert messages
  const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

  // State for available models based on selected manufacturer
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredAirplanes(airplanes);
    } else {
      const filtered = airplanes.filter(airplane => 
        airplane.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAirplanes(filtered);
    }
  };

  // Handle input change for new airplane
  const handleNewAirplaneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAirplane(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for new airplane
  const handleNewAirplaneSelectChange = (name: string, value: string) => {
    if (name === 'manufacturer') {
      setAvailableModels(modelsByManufacturer[value as keyof typeof modelsByManufacturer] || []);
      setNewAirplane(prev => ({ ...prev, [name]: value, model: "" }));
    } else {
      setNewAirplane(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle input change for update airplane
  const handleUpdateAirplaneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateAirplane(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for update airplane
  const handleUpdateAirplaneSelectChange = (name: string, value: string) => {
    if (name === 'manufacturer') {
      setAvailableModels(modelsByManufacturer[value as keyof typeof modelsByManufacturer] || []);
      setUpdateAirplane(prev => ({ ...prev, [name]: value, model: "" }));
    } else {
      setUpdateAirplane(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle airplane addition
  const handleAddAirplane = () => {
    // Basic validation
    if (!newAirplane.id || !newAirplane.model || !newAirplane.manufacturer) {
      setAlert({
        show: true,
        message: "Please fill all required fields",
        severity: "error"
      });
      return;
    }
    
    // Check if ID already exists
    if (airplanes.some(airplane => airplane.id === newAirplane.id)) {
      setAlert({
        show: true,
        message: "Airplane ID already exists",
        severity: "error"
      });
      return;
    }
    
    // Validate total capacity matches the sum of seat types
    const totalSeats = 
      Number(newAirplane.economySeats) + 
      Number(newAirplane.businessSeats) + 
      Number(newAirplane.firstClassSeats);
      
    if (totalSeats !== Number(newAirplane.capacity)) {
      setAlert({
        show: true,
        message: "Total seat count must match capacity",
        severity: "error"
      });
      return;
    }
    
    const updatedAirplanes = [...airplanes, newAirplane];
    setAirplanes(updatedAirplanes);
    setFilteredAirplanes(updatedAirplanes);
    setOpenAdd(false);
    setAlert({
      show: true,
      message: "Airplane added successfully!",
      severity: "success"
    });
    
    // Reset form
    setNewAirplane({
      id: "",
      model: "",
      manufacturer: "",
      capacity: 0,
      economySeats: 0,
      businessSeats: 0,
      firstClassSeats: 0,
      manufactureYear: new Date().getFullYear(),
      lastMaintenance: format(new Date())
    });
  };
  
  // Handle find airplane for update
  const handleFindForUpdate = () => {
    const airplaneToUpdate = airplanes.find(airplane => airplane.id === updateId);
    if (airplaneToUpdate) {
      setUpdateAirplane(airplaneToUpdate);
      setAvailableModels(modelsByManufacturer[airplaneToUpdate.manufacturer as keyof typeof modelsByManufacturer] || []);
    } else {
      setAlert({
        show: true,
        message: "Airplane not found",
        severity: "error"
      });
    }
  };
  
  // Handle airplane update
  const handleUpdateAirplane = () => {
    // Basic validation
    if (!updateAirplane.model || !updateAirplane.manufacturer) {
      setAlert({
        show: true,
        message: "Please fill all required fields",
        severity: "error"
      });
      return;
    }
    
    // Validate total capacity matches the sum of seat types
    const totalSeats = 
      Number(updateAirplane.economySeats) + 
      Number(updateAirplane.businessSeats) + 
      Number(updateAirplane.firstClassSeats);
      
    if (totalSeats !== Number(updateAirplane.capacity)) {
      setAlert({
        show: true,
        message: "Total seat count must match capacity",
        severity: "error"
      });
      return;
    }
    
    const updatedAirplanes = airplanes.map(airplane => 
      airplane.id === updateAirplane.id ? updateAirplane : airplane
    );
    
    setAirplanes(updatedAirplanes);
    setFilteredAirplanes(updatedAirplanes);
    setOpenUpdate(false);
    setAlert({
      show: true,
      message: "Airplane updated successfully!",
      severity: "success"
    });
    
    // Reset form
    setUpdateAirplane({
      id: "",
      model: "",
      manufacturer: "",
      capacity: 0,
      economySeats: 0,
      businessSeats: 0,
      firstClassSeats: 0,
      manufactureYear: 0,
      lastMaintenance: ""
    });
    setUpdateId("");
  };
  
  // Handle airplane deletion
  const handleDeleteAirplane = () => {
    if (!deleteId) {
      setAlert({
        show: true,
        message: "Please enter an airplane ID",
        severity: "error"
      });
      return;
    }
    
    // Check if airplane exists
    if (!airplanes.some(airplane => airplane.id === deleteId)) {
      setAlert({
        show: true,
        message: "Airplane not found",
        severity: "error"
      });
      return;
    }
    
    const updatedAirplanes = airplanes.filter(airplane => airplane.id !== deleteId);
    setAirplanes(updatedAirplanes);
    setFilteredAirplanes(updatedAirplanes);
    setOpenDelete(false);
    setAlert({
      show: true,
      message: "Airplane deleted successfully!",
      severity: "success"
    });
    
    // Reset form
    setDeleteId("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Airplanes</h1>
      
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
            placeholder="Search by airplane ID"
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
      
      {/* Table of airplanes */}
      <div className="mb-8 bg-white rounded-lg shadow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Total Capacity</TableHead>
              <TableHead>Economy</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>First Class</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Last Maintenance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAirplanes.map((airplane) => (
              <TableRow key={airplane.id}>
                <TableCell>{airplane.id}</TableCell>
                <TableCell>{airplane.model}</TableCell>
                <TableCell>{airplane.manufacturer}</TableCell>
                <TableCell>{airplane.capacity}</TableCell>
                <TableCell>{airplane.economySeats}</TableCell>
                <TableCell>{airplane.businessSeats}</TableCell>
                <TableCell>{airplane.firstClassSeats}</TableCell>
                <TableCell>{airplane.manufactureYear}</TableCell>
                <TableCell>{airplane.lastMaintenance}</TableCell>
              </TableRow>
            ))}
            {filteredAirplanes.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">No airplanes found</TableCell>
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
          Add New Airplane
        </Button>
        <Button 
          variant="default"
          onClick={() => setOpenUpdate(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Update Airplane
        </Button>
        <Button 
          variant="default"
          onClick={() => setOpenDelete(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete Airplane
        </Button>
      </div>
      
      {/* Add Airplane Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogHeader>
          <DialogTitle>Add New Airplane</DialogTitle>
          <DialogDescription>
            Enter details to add a new airplane to the fleet.
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">Airplane ID</Label>
              <Input
                id="id"
                name="id"
                placeholder="Airplane ID"
                value={newAirplane.id}
                onChange={handleNewAirplaneChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Select
                value={newAirplane.manufacturer}
                onValueChange={(value) => handleNewAirplaneSelectChange("manufacturer", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={newAirplane.model}
                onValueChange={(value) => handleNewAirplaneSelectChange("model", value)}
                disabled={!newAirplane.manufacturer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Total Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                placeholder="Total seat capacity"
                value={newAirplane.capacity}
                onChange={handleNewAirplaneChange}
                min={0}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="economySeats">Economy Seats</Label>
              <Input
                id="economySeats"
                name="economySeats"
                type="number"
                placeholder="Number of economy seats"
                value={newAirplane.economySeats}
                onChange={handleNewAirplaneChange}
                min={0}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessSeats">Business Seats</Label>
              <Input
                id="businessSeats"
                name="businessSeats"
                type="number"
                placeholder="Number of business seats"
                value={newAirplane.businessSeats}
                onChange={handleNewAirplaneChange}
                min={0}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="firstClassSeats">First Class Seats</Label>
              <Input
                id="firstClassSeats"
                name="firstClassSeats"
                type="number"
                placeholder="Number of first class seats"
                value={newAirplane.firstClassSeats}
                onChange={handleNewAirplaneChange}
                min={0}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manufactureYear">Manufacture Year</Label>
              <Input
                id="manufactureYear"
                name="manufactureYear"
                type="number"
                placeholder="Year of manufacture"
                value={newAirplane.manufactureYear}
                onChange={handleNewAirplaneChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
              <Input
                id="lastMaintenance"
                name="lastMaintenance"
                type="date"
                value={newAirplane.lastMaintenance}
                onChange={handleNewAirplaneChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddAirplane}>Add Airplane</Button>
        </DialogFooter>
      </Dialog>
      
      {/* Update Airplane Dialog */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogHeader>
          <DialogTitle>Update Airplane</DialogTitle>
          <DialogDescription>
            Enter the airplane ID to find and update airplane details.
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Enter Airplane ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleFindForUpdate}>
              Find
            </Button>
          </div>
          
          {updateAirplane.id && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
              <div className="col-span-1 sm:col-span-3">
                <p className="font-medium">Update details for Airplane: {updateAirplane.id}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-manufacturer">Manufacturer</Label>
                <Select
                  value={updateAirplane.manufacturer}
                  onValueChange={(value) => handleUpdateAirplaneSelectChange("manufacturer", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-model">Model</Label>
                <Select
                  value={updateAirplane.model}
                  onValueChange={(value) => handleUpdateAirplaneSelectChange("model", value)}
                  disabled={!updateAirplane.manufacturer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-capacity">Total Capacity</Label>
                <Input
                  id="update-capacity"
                  name="capacity"
                  type="number"
                  placeholder="Total seat capacity"
                  value={updateAirplane.capacity}
                  onChange={handleUpdateAirplaneChange}
                  min={0}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-economySeats">Economy Seats</Label>
                <Input
                  id="update-economySeats"
                  name="economySeats"
                  type="number"
                  placeholder="Number of economy seats"
                  value={updateAirplane.economySeats}
                  onChange={handleUpdateAirplaneChange}
                  min={0}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-businessSeats">Business Seats</Label>
                <Input
                  id="update-businessSeats"
                  name="businessSeats"
                  type="number"
                  placeholder="Number of business seats"
                  value={updateAirplane.businessSeats}
                  onChange={handleUpdateAirplaneChange}
                  min={0}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-firstClassSeats">First Class Seats</Label>
                <Input
                  id="update-firstClassSeats"
                  name="firstClassSeats"
                  type="number"
                  placeholder="Number of first class seats"
                  value={updateAirplane.firstClassSeats}
                  onChange={handleUpdateAirplaneChange}
                  min={0}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-manufactureYear">Manufacture Year</Label>
                <Input
                  id="update-manufactureYear"
                  name="manufactureYear"
                  type="number"
                  placeholder="Year of manufacture"
                  value={updateAirplane.manufactureYear}
                  onChange={handleUpdateAirplaneChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="update-lastMaintenance">Last Maintenance Date</Label>
                <Input
                  id="update-lastMaintenance"
                  name="lastMaintenance"
                  type="date"
                  value={updateAirplane.lastMaintenance}
                  onChange={handleUpdateAirplaneChange}
                />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenUpdate(false)}>Cancel</Button>
          {updateAirplane.id && (
            <Button onClick={handleUpdateAirplane}>Update Airplane</Button>
          )}
        </DialogFooter>
      </Dialog>
      
      {/* Delete Airplane Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogHeader>
          <DialogTitle>Delete Airplane</DialogTitle>
          <DialogDescription>
            Enter the airplane ID you want to delete. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Input
            placeholder="Enter Airplane ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="w-full"
          />
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDeleteAirplane}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ManageAirplanes;
