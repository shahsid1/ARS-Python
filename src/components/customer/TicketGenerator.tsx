
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import TicketDownloadAnimation from "./TicketDownloadAnimation";

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

interface TicketGeneratorProps {
  flight: FlightDetails;
  passengers: PassengerDetails[];
  bookingId: string;
  totalAmount: number;
  onClose: () => void;
}

const TicketGenerator: React.FC<TicketGeneratorProps> = ({
  flight,
  passengers,
  bookingId,
  totalAmount,
  onClose
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const downloadTicket = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`SkyRoute_Booking_${bookingId}.pdf`);
      
      // Show animation after download
      setShowAnimation(true);
    }
  };
  
  const handleAnimationComplete = () => {
    // Redirect to customer dashboard after animation completes
    navigate("/customer/dashboard");
  };

  return (
    <div className="space-y-6 booking-step-enter">
      <div className="flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
        <FileText className="h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Your Booking is Confirmed!</h3>
      </div>
      
      <div className="flex justify-between animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
        <div>
          <div className="text-sm text-muted-foreground">Booking ID</div>
          <div className="font-medium">{bookingId}</div>
        </div>
        <Button onClick={downloadTicket} className="btn-hover-effect">
          <FileText className="h-4 w-4 mr-2" />
          Download Ticket
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden animate-scale-in" 
           style={{ animationDelay: "0.4s" }}
           ref={ticketRef}>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
          <div className="text-2xl font-bold">SkyRoute Airways</div>
          <div className="text-sm">E-Ticket / Boarding Pass</div>
        </div>
        
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Flight</div>
              <div className="font-bold">{flight.airline} {flight.flightNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="font-bold">{flight.date}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Booking ID</div>
              <div className="font-bold">{bookingId}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <div className="text-xl font-bold">{flight.departure.time}</div>
              <div className="text-lg">{flight.departure.city}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{flight.duration}</div>
              <div className="relative">
                <div className="border-t border-dashed border-gray-300 my-2"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
              </div>
              <div className="text-xs">Direct</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{flight.arrival.time}</div>
              <div className="text-lg">{flight.arrival.city}</div>
            </div>
          </div>

          <div className="border-t border-dashed pt-4">
            <div className="text-sm font-medium mb-2">Passenger Details</div>
            <div className="space-y-2">
              {passengers.map((passenger, index) => (
                <div key={index} className="grid grid-cols-3 text-sm">
                  <div>
                    <span className="text-muted-foreground mr-1">Name:</span>
                    {passenger.firstName} {passenger.lastName}
                  </div>
                  <div>
                    <span className="text-muted-foreground mr-1">Age:</span>
                    {passenger.age}
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground mr-1">Seat:</span>
                    {String.fromCharCode(65 + index)}{Math.floor(Math.random() * 30) + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-dashed pt-4">
            <div className="flex justify-between font-medium">
              <span>Total Amount Paid</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-dashed pt-4 text-xs text-muted-foreground">
            <p>Please arrive at the airport at least 2 hours before departure. Present this e-ticket along with a valid photo ID at the check-in counter.</p>
            <p className="mt-2">For any assistance, contact SkyRoute Airways customer support at 1800-123-4567 or support@skyroute.com</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <Button onClick={onClose} className="btn-hover-effect">
          Close
        </Button>
      </div>
      
      {/* Download completion animation */}
      {showAnimation && (
        <TicketDownloadAnimation
          onComplete={handleAnimationComplete}
          duration={3000}
        />
      )}
    </div>
  );
};

export default TicketGenerator;
