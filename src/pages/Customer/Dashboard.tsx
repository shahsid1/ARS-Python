
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Example booking data
const bookings = [
  {
    id: "BK12345",
    from: "Delhi",
    to: "Mumbai",
    date: "2025-05-15",
    status: "Confirmed",
    passengers: 2
  },
  {
    id: "BK12346",
    from: "Bangalore",
    to: "Chennai",
    date: "2025-06-22",
    status: "Confirmed",
    passengers: 1
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    // Get user data from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.firstName || "Customer");
    }
    
    // Get wallet balance
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      setWalletBalance(parseFloat(storedWallet));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
        <p className="text-gray-500">Here's an overview of your account</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <CardDescription>Your current balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{walletBalance.toFixed(2)}</div>
            <Button 
              variant="link" 
              className="p-0 h-auto text-airline-sky"
              onClick={() => navigate("/customer/wallet")}
            >
              Add money
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SkyPoints</CardTitle>
            <CardDescription>Your loyalty rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">350</div>
            <p className="text-xs text-muted-foreground">
              150 points until your next reward
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
            <CardDescription>Your travel history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 domestic, 2 international
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Trips</CardTitle>
                <CardDescription>
                  Your upcoming flight bookings
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/customer/bookings")}
              >
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <p className="font-medium">
                        {booking.from} to {booking.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} • {booking.passengers} Passenger{booking.passengers !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.id}</p>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You don't have any upcoming trips</p>
                <Button onClick={() => navigate("/customer/search")}>Book a Flight</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/customer/search")}
              >
                Book a new flight
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/customer/wallet")}
              >
                Add money to wallet
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/support")}
              >
                Contact support
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/customer/profile")}
              >
                Update profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
