
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type PromotionCardProps = {
  title: string;
  description: string;
  offer: string;
  validUntil: string;
  imageUrl: string;
};

const PromotionCard = ({
  title,
  description,
  offer,
  validUntil,
  imageUrl
}: PromotionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border-airline-soft-blue-gray hover:border-airline-dusty-blue promotion-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-48 w-full bg-cover bg-center transition-transform duration-700"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      <CardHeader className="p-4">
        <CardTitle className="text-lg text-airline-slate-gray">{title}</CardTitle>
        <CardDescription className="text-xs text-airline-slate-gray/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-2">
          <span className={`font-bold text-airline-deep-navy text-lg transition-all duration-300 ${isHovered ? 'text-airline-dusty-blue' : ''}`}>
            {offer}
          </span>
        </div>
        <p className="text-sm text-airline-slate-gray/70">Valid until {validUntil}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full border-airline-dusty-blue text-airline-dusty-blue hover:bg-airline-soft-blue-gray hover:text-airline-deep-navy btn-hover-effect"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromotionCard;
