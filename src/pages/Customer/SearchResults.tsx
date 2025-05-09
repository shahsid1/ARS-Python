
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BookingDialog from "@/components/customer/BookingDialog";
import { StaggeredEntry } from "@/components/ui/page-transition";

// Mock flight data
const mockFlights = [
  {
    id: "FL001",
    airline: "SkyRoute Airways",
    flightNumber: "SR101",
    departure: {
      city: "Delhi",
      time: "08:00",
    },
    arrival: {
      city: "Mumbai",
      time: "10:15",
    },
    duration: "2h 15m",
    price: 5890,
    seatsAvailable: 24,
  },
  {
    id: "FL002",
    airline: "SkyRoute Airways",
    flightNumber: "SR201",
    departure: {
      city: "Delhi",
      time: "14:30",
    },
    arrival: {
      city: "Mumbai",
      time: "16:45",
    },
    duration: "2h 15m",
    price: 6450,
    seatsAvailable: 12,
  },
  {
    id: "FL003",
    airline: "SkyRoute Airways",
    flightNumber: "SR301",
    departure: {
      city: "Delhi",
      time: "19:15",
    },
    arrival: {
      city: "Mumbai",
      time: "21:30",
    },
    duration: "2h 15m",
    price: 7200,
    seatsAvailable: 5,
  }
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<any>(null);
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  useEffect(() => {
    if (location.state) {
      setSearchParams(location.state);
      
      // Simulate API loading
      setTimeout(() => {
        // Filter mock flights based on source and destination
        const filteredFlights = mockFlights.filter(
          flight => 
            flight.departure.city === location.state.source && 
            flight.arrival.city === location.state.destination
        );
        
        setFlights(filteredFlights);
        setLoading(false);
      }, 800); // Show loading state for a short period
    } else {
      navigate("/customer/search");
      toast.error("Search parameters not found. Please try again.");
    }
  }, [location.state, navigate]);

  const handleBookFlight = (flight: any) => {
    setSelectedFlight({
      ...flight,
      date: searchParams?.date || new Date().toLocaleDateString(),
    });
    setIsBookingDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="flex space-x-2">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
        <p className="text-airline-dusty-blue animate-pulse">Searching for the best flights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Flight Search Results</h1>
        <p className="text-gray-500">
          {searchParams?.source} to {searchParams?.destination} • {searchParams?.date}
        </p>
      </div>
      
      {flights.length > 0 ? (
        <StaggeredEntry className="space-y-4" baseDelay={100} delayIncrement={200}>
          {flights.map((flight) => (
            <Card key={flight.id} className="hover:shadow-md transition-all duration-300 flight-card">
              <CardContent className="p-6">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold">{flight.departure.time}</span>
                      <span className="text-sm text-muted-foreground">{flight.departure.city}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-12 md:col-span-2">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-xs text-center text-muted-foreground">
                        <div>{flight.duration}</div>
                        <div className="w-full h-0.5 bg-gray-300 my-2 relative">
                          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 rotate-45 w-2 h-2 border-t border-r border-gray-300"></div>
                        </div>
                        <div>Direct</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold">{flight.arrival.time}</span>
                      <span className="text-sm text-muted-foreground">{flight.arrival.city}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-12 md:col-span-2">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold">₹{flight.price}</span>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                  </div>
                  
                  <div className="col-span-12 md:col-span-2">
                    <div className="flex flex-col items-end justify-center h-full">
                      <Button 
                        onClick={() => handleBookFlight(flight)}
                        className="btn-hover-effect"
                      >
                        Book Now
                      </Button>
                      <span className={`text-xs mt-1 ${
                        flight.seatsAvailable <= 5 
                          ? 'text-destructive' 
                          : 'text-muted-foreground'
                      }`}>
                        {flight.seatsAvailable} seats left
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredEntry>
      ) : (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>No Flights Found</CardTitle>
            <CardDescription>
              We couldn't find any flights matching your search criteria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/customer/search")}
              className="btn-hover-effect"
            >
              Search Again
            </Button>
          </CardContent>
        </Card>
      )}
      
      {selectedFlight && (
        <BookingDialog
          open={isBookingDialogOpen}
          onClose={() => setIsBookingDialogOpen(false)}
          flight={selectedFlight}
        />
      )}
    </div>
  );
};

export default SearchResults;
