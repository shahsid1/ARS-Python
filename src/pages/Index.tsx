
import Hero from "@/components/home/Hero";
import PromotionCard from "@/components/home/PromotionCard";

const promotions = [
  {
    title: "Summer Special",
    description: "Escape to popular beach destinations",
    offer: "Get 15% OFF",
    validUntil: "August 31, 2025",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Weekend Getaways",
    description: "Perfect short trips near major cities",
    offer: "Prices from ₹4,999",
    validUntil: "December 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Family Vacation Package",
    description: "Special deals for family travelers",
    offer: "Kids Fly Free",
    validUntil: "September 30, 2025",
    imageUrl: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Business Class Upgrade",
    description: "Enhanced comfort for business travelers",
    offer: "Upgrade from ₹2,999",
    validUntil: "July 31, 2025",
    imageUrl: "https://images.unsplash.com/photo-1540339832862-474599807836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const Index = () => {
  return (
    <div>
      <Hero />
      
      <section className="py-16 bg-airline-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Current Offers</h2>
            <p className="text-gray-600">Special deals and promotions for your next journey</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotions.map((promo, index) => (
              <PromotionCard key={index} {...promo} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Fly with SkyRoute Airways?</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-airline-sky flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-xl">Extensive Network</h3>
                    <p className="text-gray-600">Connecting over 40 cities across India with comfortable flights.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-airline-sky flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-xl">Affordable Pricing</h3>
                    <p className="text-gray-600">Competitive fares with regular promotions and loyalty rewards.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-airline-sky flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-xl">Excellent Service</h3>
                    <p className="text-gray-600">Dedicated staff ensuring your comfort and satisfaction at every step.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Airplane wing view" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
