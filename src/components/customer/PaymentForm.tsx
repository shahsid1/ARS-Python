
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Wallet, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onSuccess,
  onBack
}) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get wallet balance from localStorage or set default
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      setWalletBalance(parseFloat(storedWallet));
    }
  }, []);

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === "wallet") {
        // Check if wallet has sufficient balance
        if (walletBalance < amount) {
          toast.error("Insufficient wallet balance. Please add funds or choose another payment method.");
          setLoading(false);
          return;
        }

        // Update wallet balance
        const newBalance = walletBalance - amount;
        localStorage.setItem("wallet", newBalance.toString());
        setWalletBalance(newBalance);
      } else if (paymentMethod === "card") {
        // Validate card details (basic validation)
        if (cardNumber.length < 16 || cardName.length < 3 || cardExpiry.length < 5 || cardCvv.length < 3) {
          toast.error("Please enter valid card details.");
          setLoading(false);
          return;
        }
      } else if (paymentMethod === "upi") {
        // Validate UPI ID (basic validation)
        if (!upiId.includes("@")) {
          toast.error("Please enter a valid UPI ID.");
          setLoading(false);
          return;
        }
      }

      // Payment successful
      toast.success("Payment successful!");
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment</h3>
        <p className="text-sm text-muted-foreground">Choose your payment method</p>
      </div>

      <div className="border rounded-lg p-4">
        <Tabs defaultValue="wallet" onValueChange={setPaymentMethod}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="upi">UPI</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-4 mt-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              <div>
                <div className="text-sm">Wallet Balance</div>
                <div className="font-medium">₹{walletBalance.toFixed(2)}</div>
              </div>
            </div>
            
            {walletBalance < amount && (
              <div className="text-sm text-red-500">
                Insufficient balance. Please add funds or choose another payment method.
              </div>
            )}
          </TabsContent>

          <TabsContent value="card" className="mt-4">
            <form className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</label>
                <Input 
                  id="cardName" 
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cardExpiry" className="text-sm font-medium">Expiry Date</label>
                  <Input 
                    id="cardExpiry" 
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="cardCvv" className="text-sm font-medium">CVV</label>
                  <Input 
                    id="cardCvv" 
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="upi" className="mt-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="upiId" className="text-sm font-medium">UPI ID</label>
                <Input 
                  id="upiId" 
                  placeholder="username@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator />
      
      <div className="space-y-2">
        <div className="flex justify-between font-medium text-lg">
          <span>Total amount</span>
          <span>₹{amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="w-1/2">
          Back
        </Button>
        <Button 
          onClick={processPayment} 
          className="w-1/2"
          disabled={loading || (paymentMethod === "wallet" && walletBalance < amount)}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
