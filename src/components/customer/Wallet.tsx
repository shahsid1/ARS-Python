
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  
  useEffect(() => {
    // Get wallet balance from localStorage
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      setBalance(parseFloat(storedWallet));
    }
  }, []);
  
  const saveTransaction = (amount: number, method: string) => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.push({
      id: `TXN${Math.floor(Math.random() * 10000)}`,
      amount,
      type: "Credit",
      method,
      date: new Date().toISOString()
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  const handleAddMoney = (method: string) => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const amountToAdd = parseFloat(amount);
    
    if (method === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error("Please fill in all card details");
        return;
      }
      
      if (cardDetails.number.length < 16) {
        toast.error("Please enter a valid card number");
        return;
      }
    } else if (method === "upi") {
      if (!upiId) {
        toast.error("Please enter your UPI ID");
        return;
      }
      
      if (!upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID");
        return;
      }
    }
    
    // Update wallet balance
    const newBalance = balance + amountToAdd;
    setBalance(newBalance);
    localStorage.setItem("wallet", newBalance.toString());
    
    // Save transaction
    saveTransaction(amountToAdd, method === "card" ? "Card" : "UPI");
    
    // Clear form
    setAmount("");
    setCardDetails({
      number: "",
      name: "",
      expiry: "",
      cvv: ""
    });
    setUpiId("");
    
    toast.success(`₹${amountToAdd.toFixed(2)} added to your wallet successfully`);
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Wallet</CardTitle>
          <CardDescription>
            Add funds to your wallet for quick and easy flight bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-airline-light-gray rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
            <p className="text-3xl font-bold">₹{balance.toFixed(2)}</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Add</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="amount"
                  type="number"
                  min="100"
                  step="100"
                  placeholder="1000"
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={handleCardDetailsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="name"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={handleCardDetailsChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardDetailsChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      name="cvv"
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleAddMoney("card")}
                >
                  Add Money
                </Button>
              </TabsContent>
              
              <TabsContent value="upi" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="name@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                
                <div className="bg-white border rounded-lg p-4 my-6">
                  <div className="flex justify-center">
                    <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                      <p className="text-sm text-center text-gray-500">
                        QR Code<br />
                        (Sample)
                      </p>
                    </div>
                  </div>
                  <p className="text-center mt-2 text-sm text-gray-500">
                    Scan this QR code with any UPI app to add money
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleAddMoney("upi")}
                >
                  Add Money
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">
            By adding money, you agree to our terms and conditions. Added funds are non-refundable and 
            can only be used for bookings on SkyRoute Airways.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Wallet;
