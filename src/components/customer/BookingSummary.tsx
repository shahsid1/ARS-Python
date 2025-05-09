
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface PassengerDetails {
  firstName: string;
  lastName: string;
  age: string;
}

interface FlightDetails {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    city: string;
    time: string;
  };
  arrival: {
    city: string;
    time: string;
  };
  duration: string;
  price: number;
  date: string;
}

interface BookingSummaryProps {
  flight: FlightDetails;
  passengers: PassengerDetails[];
  onConfirm: () => void;
  onBack: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  flight,
  passengers,
  onConfirm,
  onBack
}) => {
  const totalAmount = flight.price * passengers.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Check className="h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Booking Summary</h3>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Flight Details</h4>
        <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
          <div>
            <div className="text-sm text-muted-foreground">Flight</div>
            <div className="font-medium">{flight.airline} {flight.flightNumber}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Date</div>
            <div className="font-medium">{flight.date}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Departure</div>
            <div className="font-medium">{flight.departure.city}, {flight.departure.time}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Arrival</div>
            <div className="font-medium">{flight.arrival.city}, {flight.arrival.time}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Duration</div>
            <div className="font-medium">{flight.duration}</div>
          </div>
        </div>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-medium">Passenger Details</h4>
        <div className="space-y-2">
          {passengers.map((passenger, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 rounded-lg border p-3">
              <div className="font-medium">{passenger.firstName} {passenger.lastName}</div>
              <div className="text-muted-foreground">Age: {passenger.age}</div>
              <div className="text-right">₹{flight.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Base fare ({passengers.length} passengers)</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxes & fees</span>
          <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium text-lg">
          <span>Total amount</span>
          <span>₹{(totalAmount * 1.18).toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="w-1/2">
          Back
        </Button>
        <Button onClick={onConfirm} className="w-1/2">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
