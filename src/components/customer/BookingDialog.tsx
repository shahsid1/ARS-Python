
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PassengerForm from "./PassengerForm";
import BookingSummary from "./BookingSummary";
import PaymentForm from "./PaymentForm";
import TicketGenerator from "./TicketGenerator";

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

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  flight: FlightDetails;
}

const BookingDialog = ({ open, onClose, flight }: BookingDialogProps) => {
  const [currentStep, setCurrentStep] = useState<"passengers" | "summary" | "payment" | "completed">("passengers");
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [animating, setAnimating] = useState(false);
  
  // Calculate total amount with tax
  const totalAmount = passengers.length * flight.price * 1.18;
  
  // Handle transitions between steps
  const transitionToStep = (nextStep: "passengers" | "summary" | "payment" | "completed") => {
    setAnimating(true);
    
    // Wait for exit animation to complete before changing step
    setTimeout(() => {
      setCurrentStep(nextStep);
      // Small delay before entrance animation starts
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 300);
  };
  
  const handlePassengerSubmit = (passengerData: PassengerDetails[]) => {
    setPassengers(passengerData);
    transitionToStep("summary");
  };
  
  const handleBackToPassengers = () => {
    transitionToStep("passengers");
  };
  
  const handleProceedToPayment = () => {
    transitionToStep("payment");
  };
  
  const handleBackToSummary = () => {
    transitionToStep("summary");
  };
  
  const handlePaymentSuccess = () => {
    // Generate a random booking ID
    const randomBookingId = "SRA" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    setBookingId(randomBookingId);
    transitionToStep("completed");
    
    // Add to bookings in localStorage
    const newBooking = {
      id: randomBookingId,
      flight: flight,
      passengers: passengers,
      totalAmount: totalAmount,
      date: new Date().toISOString(),
    };
    
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));
  };
  
  const handleCloseDialog = () => {
    // Reset state
    setCurrentStep("passengers");
    setPassengers([]);
    onClose();
  };
  
  // Reset animation state when dialog closes/opens
  useEffect(() => {
    if (open) {
      setAnimating(false);
    }
  }, [open]);
  
  const renderStepContent = () => {
    // Classes for animation
    const animationClass = animating 
      ? "booking-step-exit opacity-0" 
      : "booking-step-enter";
    
    switch (currentStep) {
      case "passengers":
        return (
          <div className={animationClass}>
            <PassengerForm onSubmit={handlePassengerSubmit} />
          </div>
        );
      case "summary":
        return (
          <div className={animationClass}>
            <BookingSummary 
              flight={{...flight, date: flight.date || new Date().toLocaleDateString()}} 
              passengers={passengers} 
              onConfirm={handleProceedToPayment}
              onBack={handleBackToPassengers}
            />
          </div>
        );
      case "payment":
        return (
          <div className={animationClass}>
            <PaymentForm 
              amount={totalAmount} 
              onSuccess={handlePaymentSuccess}
              onBack={handleBackToSummary}
            />
          </div>
        );
      case "completed":
        return (
          <div className={animationClass}>
            <TicketGenerator 
              flight={{...flight, date: flight.date || new Date().toLocaleDateString()}}
              passengers={passengers}
              bookingId={bookingId}
              totalAmount={totalAmount}
              onClose={handleCloseDialog}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
