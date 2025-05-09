
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  type: "Credit" | "Debit";
  method: string;
  description: string;
  date: string;
}

const TransactionHistory = () => {
  // Mock transactions for demonstration - moved up before it's referenced
  const mockTransactions: Transaction[] = [
    {
      id: "TXN1001",
      amount: 5000,
      type: "Credit",
      method: "Card",
      description: "Wallet recharge",
      date: "2025-04-22T10:30:00"
    },
    {
      id: "TXN1002",
      amount: 12500,
      type: "Debit",
      method: "Wallet",
      description: "Flight booking - BK1001",
      date: "2025-04-22T11:45:00"
    },
    {
      id: "TXN1003",
      amount: 2000,
      type: "Credit",
      method: "UPI",
      description: "Wallet recharge",
      date: "2025-04-15T09:20:00"
    },
    {
      id: "TXN1004",
      amount: 18750,
      type: "Debit",
      method: "Wallet",
      description: "Flight booking - BK1002",
      date: "2025-04-10T14:15:00"
    },
    {
      id: "TXN1005",
      amount: 3500,
      type: "Credit",
      method: "UPI",
      description: "Partial refund - BK1004",
      date: "2025-03-08T16:40:00"
    }
  ];
  
  // Load transactions from localStorage or use mock data
  const loadTransactions = () => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      return JSON.parse(storedTransactions);
    }
    return mockTransactions;
  };
  
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions());
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter transactions based on search term
    if (searchTerm) {
      const filtered = transactions.filter(
        transaction =>
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchTerm, transactions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all your wallet transactions
              </CardDescription>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <Badge className={transaction.type === "Credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right ${transaction.type === "Credit" ? "text-green-600" : "text-red-600"} font-medium`}>
                        {transaction.type === "Credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
