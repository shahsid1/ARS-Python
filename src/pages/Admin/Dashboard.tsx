
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to the SkyRoute Airways admin panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
            <CardDescription>Daily active flights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-xs text-green-500 flex items-center">
              +4.5% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CardDescription>Daily bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,652</div>
            <p className="text-xs text-green-500 flex items-center">
              +12.3% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CardDescription>Today's revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹12.5L</div>
            <p className="text-xs text-green-500 flex items-center">
              +8.2% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CardDescription>Current online users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">438</div>
            <p className="text-xs text-red-500 flex items-center">
              -1.8% from last hour
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest 5 bookings in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Booking #{10000 + i}</p>
                    <p className="text-sm text-muted-foreground">
                      {i === 1
                        ? "Delhi to Mumbai • 2h 10m • Today"
                        : i === 2
                        ? "Bangalore to Hyderabad • 1h 35m • Today"
                        : i === 3
                        ? "Chennai to Kolkata • 2h 45m • Yesterday"
                        : i === 4
                        ? "Mumbai to Jaipur • 2h 05m • Yesterday"
                        : "Delhi to Bangalore • 2h 55m • 2 days ago"}
                    </p>
                  </div>
                  <span className="text-sm font-medium">₹{2000 + i * 1000}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>
              Latest customer support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">
                      {i === 1
                        ? "Baggage lost during transit"
                        : i === 2
                        ? "Flight delay compensation"
                        : i === 3
                        ? "Refund request for cancelled flight"
                        : i === 4
                        ? "Special meal not served"
                        : "Website booking error"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ticket #{5000 + i} • 
                      {i <= 2
                        ? " Open"
                        : i === 3
                        ? " In Progress"
                        : " Resolved"}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    i <= 2
                      ? "bg-red-100 text-red-800"
                      : i === 3
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {i <= 2
                      ? "High"
                      : i === 3
                      ? "Medium"
                      : "Low"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
