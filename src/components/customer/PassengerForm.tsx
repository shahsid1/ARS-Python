
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MinusCircle, User } from "lucide-react";

const passengerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string().min(1, "Age is required"),
});

const PassengersFormSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
});

type PassengerFormValues = z.infer<typeof PassengersFormSchema>;

interface PassengerFormProps {
  onSubmit: (passengers: any[]) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ onSubmit }) => {
  const [passengers, setPassengers] = useState([{ firstName: "", lastName: "", age: "" }]);

  const form = useForm<PassengerFormValues>({
    resolver: zodResolver(PassengersFormSchema),
    defaultValues: {
      passengers: [{ firstName: "", lastName: "", age: "" }],
    },
  });

  const addPassenger = () => {
    if (passengers.length < 4) {
      setPassengers([...passengers, { firstName: "", lastName: "", age: "" }]);
      form.setValue("passengers", [...passengers, { firstName: "", lastName: "", age: "" }]);
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const newPassengers = [...passengers];
      newPassengers.splice(index, 1);
      setPassengers(newPassengers);
      form.setValue("passengers", newPassengers);
    }
  };

  const handleSubmit = (data: PassengerFormValues) => {
    onSubmit(data.passengers);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <h3 className="text-lg font-medium">Passenger Details</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {passengers.length} / 4 passengers
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {passengers.map((_, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Passenger {index + 1}</h4>
                {passengers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePassenger(index)}
                  >
                    <MinusCircle className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name={`passengers.${index}.firstName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`passengers.${index}.lastName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`passengers.${index}.age`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          
          {passengers.length < 4 && (
            <Button
              type="button"
              variant="outline"
              onClick={addPassenger}
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Passenger
            </Button>
          )}
          
          <Button type="submit" className="w-full">
            Continue to Booking Summary
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PassengerForm;
