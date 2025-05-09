
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FlightSearchAnimation from "@/components/home/FlightSearchAnimation";

// Dummy data for Indian cities
const indianCities = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata",
  "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
  "Surat", "Kanpur", "Nagpur", "Patna", "Indore"
];

const cabinClasses = ["Economy", "Premium Economy", "Business", "First Class"];

const CustomerSearch = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [cabinClass, setCabinClass] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  
  const [passengerCount, setPassengerCount] = useState({
    adults: 1,
    children: 0,
    seniors: 0,
    pwds: 0
  });

  const totalPassengers = 
    passengerCount.adults + 
    passengerCount.children + 
    passengerCount.seniors + 
    passengerCount.pwds;

  const handlePassengerChange = (type: keyof typeof passengerCount, value: number) => {
    if (value < 0) return;
    
    // Calculate new total excluding the current category
    const currentTotal = totalPassengers - passengerCount[type];
    
    // Check if adding this value would exceed max passengers
    if (currentTotal + value > 4) {
      toast.error("Maximum 4 passengers allowed in total");
      return;
    }
    
    setPassengerCount((prev) => ({ ...prev, [type]: value }));
  };

  const handleSearch = () => {
    if (!source || !destination || !date || !cabinClass) {
      toast.error("Please fill in all search fields");
      return;
    }

    if (source === destination) {
      toast.error("Source and destination cannot be the same");
      return;
    }

    if (totalPassengers === 0) {
      toast.error("Please select at least one passenger");
      return;
    }

    // Show animation before navigating
    setShowAnimation(true);
  };
  
  const handleAnimationComplete = () => {
    // Navigate to search results after animation completes
    navigate("/customer/search-results", {
      state: {
        source,
        destination,
        date: format(date as Date, "yyyy-MM-dd"),
        cabinClass,
        passengerCount
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Book a Flight</h1>
        <p className="text-gray-500">Search for available flights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flight Search</CardTitle>
          <CardDescription>
            Fill in the details to find flights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cities</SelectLabel>
                    {indianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cities</SelectLabel>
                    {indianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <span>{totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="space-y-4 p-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-gray-500">12+ years</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("adults", passengerCount.adults - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengerCount.adults}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("adults", passengerCount.adults + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-gray-500">2-11 years</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("children", passengerCount.children - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengerCount.children}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("children", passengerCount.children + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Seniors</p>
                        <p className="text-sm text-gray-500">60+ years</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("seniors", passengerCount.seniors - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengerCount.seniors}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("seniors", passengerCount.seniors + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">PWDs</p>
                        <p className="text-sm text-gray-500">Special assistance</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("pwds", passengerCount.pwds - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengerCount.pwds}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePassengerChange("pwds", passengerCount.pwds + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</label>
              <Select value={cabinClass} onValueChange={setCabinClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Classes</SelectLabel>
                    {cabinClasses.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={handleSearch} className="px-8 py-6" size="lg">
              <Search className="mr-2 h-4 w-4" /> Search Flights
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Searches</CardTitle>
          <CardDescription>
            Your recent flight searches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No recent searches found.</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Animation overlay */}
      {showAnimation && (
        <FlightSearchAnimation
          source={source}
          destination={destination}
          onComplete={handleAnimationComplete}
          duration={4000}
        />
      )}
    </div>
  );
};

export default CustomerSearch;
