
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// FAQ items
const faqItems = [
  {
    question: "What is the baggage allowance for domestic flights?",
    answer: "For domestic flights, passengers are allowed 15kg of check-in baggage and one piece of cabin baggage weighing up to 7kg. Additional baggage can be purchased during booking or at the airport for an extra fee."
  },
  {
    question: "How can I change my flight date?",
    answer: "You can change your flight date by logging into your account, going to 'My Bookings', selecting the booking you wish to change, and clicking on the 'Change Flight' option. Date change fees and fare difference may apply depending on your booking type."
  },
  {
    question: "What identification is required for domestic travel?",
    answer: "For domestic travel within India, passengers must carry a valid government-issued photo ID such as Aadhar Card, Voter ID, Passport, Driving License, or PAN Card. The ID used during booking should match the one presented at the airport."
  },
  {
    question: "Can I cancel my booking and get a refund?",
    answer: "Yes, you can cancel your booking through the 'My Bookings' section of your account. Refund amounts depend on the fare type and how close to departure you cancel. Some promotional fares may be non-refundable."
  },
  {
    question: "How early should I arrive at the airport?",
    answer: "We recommend arriving at least 2 hours before departure for domestic flights and 3 hours for international flights. This allows time for check-in, security procedures, and boarding."
  },
  {
    question: "Do you offer special assistance for passengers with disabilities?",
    answer: "Yes, we provide special assistance for passengers with disabilities or reduced mobility. Please request these services at least 48 hours before your flight by contacting our customer service team."
  },
  {
    question: "How can I select my preferred seat?",
    answer: "Seat selection can be done during the booking process or later through the 'Manage Booking' section of your account. Some seats may have an additional charge depending on their location in the aircraft."
  },
  {
    question: "What items are prohibited in carry-on luggage?",
    answer: "Prohibited items include sharp objects, firearms, explosives, flammable substances, and certain electronics. Liquids are restricted to containers of 100ml or less, placed in a clear, resealable plastic bag with a maximum capacity of 1 liter."
  },
];

// Customer service representatives
const representatives = [
  {
    name: "Priya Sharma",
    avatar: "PS",
    status: "Available",
    expertise: "Booking Issues, Refunds"
  },
  {
    name: "Raj Kumar",
    avatar: "RK",
    status: "Busy",
    expertise: "Technical Support, Website Issues"
  },
  {
    name: "Ananya Patel",
    avatar: "AP",
    status: "Available",
    expertise: "Flight Information, Schedule Changes"
  },
  {
    name: "Vikram Singh",
    avatar: "VS",
    status: "Away",
    expertise: "Baggage Claims, Lost Items"
  }
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState(faqItems);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    bookingRef: ""
  });
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{rep: string, messages: {sender: string, text: string, time: string}[]}[]>([]);

  // Handle FAQ search
  const handleFAQSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredFAQs(faqItems);
    } else {
      const filtered = faqItems.filter(
        item => item.question.toLowerCase().includes(term) || 
               item.answer.toLowerCase().includes(term)
      );
      setFilteredFAQs(filtered);
    }
  };

  // Handle contact form changes
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Submit form (in a real app, this would be an API call)
    toast.success("Your message has been submitted. We'll get back to you soon!");
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      bookingRef: ""
    });
  };

  // Start a new chat with a representative
  const startChat = (repName: string) => {
    if (!chatHistory.some(chat => chat.rep === repName)) {
      setChatHistory([...chatHistory, {
        rep: repName,
        messages: [{
          sender: repName,
          text: `Hello! This is ${repName}. How can I help you today?`,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]
      }]);
    }
    setActiveChat(repName);
  };

  // Send a chat message
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatInput.trim() || !activeChat) return;
    
    const newMessage = {
      sender: "You",
      text: chatInput,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    // Update chat history
    setChatHistory(chatHistory.map(chat => 
      chat.rep === activeChat 
        ? {...chat, messages: [...chat.messages, newMessage]} 
        : chat
    ));
    
    // Clear input
    setChatInput("");
    
    // Simulate reply after delay
    setTimeout(() => {
      const repMessage = {
        sender: activeChat,
        text: getAutoReply(),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setChatHistory(prevChats => prevChats.map(chat => 
        chat.rep === activeChat 
          ? {...chat, messages: [...chat.messages, repMessage]} 
          : chat
      ));
    }, 1000);
  };

  // Generate random auto-reply
  const getAutoReply = () => {
    const replies = [
      "Thank you for your message. Let me check that for you.",
      "I understand your concern. Let me see how I can help.",
      "I'm looking into this for you now.",
      "Could you please provide more details about your issue?",
      "Let me connect you with our specialist team for better assistance.",
      "I'd be happy to help you resolve this issue."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Customer Support</h1>
      
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
        </TabsList>
        
        {/* FAQ Tab Content */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions about our services.</CardDescription>
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={handleFAQSearch}
                className="mt-2"
              />
            </CardHeader>
            <CardContent className="space-y-6">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No FAQs match your search. Try different keywords.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contact Us Tab Content */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={contactForm.name} 
                      onChange={handleContactFormChange} 
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={contactForm.email} 
                      onChange={handleContactFormChange} 
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      value={contactForm.subject} 
                      onChange={handleContactFormChange} 
                      placeholder="What is your inquiry about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bookingRef">Booking Reference (if applicable)</Label>
                    <Input 
                      id="bookingRef" 
                      name="bookingRef" 
                      value={contactForm.bookingRef} 
                      onChange={handleContactFormChange} 
                      placeholder="e.g., SRA12345"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={contactForm.message} 
                      onChange={handleContactFormChange} 
                      placeholder="Please describe your issue or question in detail"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="mt-6 w-full md:w-auto">
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-6">
              <h3 className="font-semibold mb-2">Other Ways to Reach Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Customer Service</p>
                  <p className="text-sm text-gray-600">1800-123-4567 (Toll-Free)</p>
                  <p className="text-sm text-gray-600">support@skyroute.com</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Head Office</p>
                  <p className="text-sm text-gray-600">SkyRoute Airways, Airport Road</p>
                  <p className="text-sm text-gray-600">New Delhi, 110037</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Live Chat Tab Content */}
        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Available Representatives</CardTitle>
                <CardDescription>Select a representative to start chatting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {representatives.map((rep, index) => (
                    <div 
                      key={index} 
                      onClick={() => startChat(rep.name)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer ${activeChat === rep.name ? 'bg-primary/10' : 'hover:bg-gray-100'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${rep.status === 'Available' ? 'bg-green-500' : rep.status === 'Busy' ? 'bg-orange-500' : 'bg-gray-500'}`}>
                        {rep.avatar}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{rep.name}</p>
                        <div className="flex items-center text-sm">
                          <span className={`w-2 h-2 rounded-full mr-1 ${rep.status === 'Available' ? 'bg-green-500' : rep.status === 'Busy' ? 'bg-orange-500' : 'bg-gray-500'}`}></span>
                          <span className="text-gray-600">{rep.status}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{rep.expertise}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {activeChat ? `Chat with ${activeChat}` : 'Select a Representative'}
                </CardTitle>
                {activeChat && (
                  <CardDescription>
                    Our representatives typically reply within a few minutes
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {!activeChat ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Select a representative from the list to start a chat</p>
                  </div>
                ) : (
                  <div className="h-[400px] flex flex-col">
                    <div className="flex-grow overflow-y-auto mb-4 space-y-3 p-2">
                      {chatHistory
                        .find(chat => chat.rep === activeChat)?.messages
                        .map((msg, i) => (
                          <div 
                            key={i} 
                            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                          >
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.sender === "You" 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-gray-100"
                              }`}
                            >
                              <div className="font-medium text-sm flex justify-between">
                                <span>{msg.sender}</span>
                                <span className="ml-4 opacity-70 text-xs">{msg.time}</span>
                              </div>
                              <p className="mt-1">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <form onSubmit={sendChatMessage} className="flex gap-2">
                      <Input 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
