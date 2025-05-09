
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="bg-airline-sky py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">About SkyRoute Airways</h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">
            Your trusted airline for domestic travel across India since 2005.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2005, SkyRoute Airways began with a small fleet of 3 aircraft operating 
              between Delhi, Mumbai, and Bangalore. Over the years, we have grown to become one 
              of India's leading airlines, connecting major cities and smaller towns across the country.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is to make air travel accessible, affordable, and enjoyable for everyone. 
              We pride ourselves on maintaining high standards of service, safety, and reliability.
            </p>
            <p className="text-gray-700">
              Today, our fleet consists of over 50 modern aircraft serving more than 40 destinations 
              across India and select international routes to neighboring countries.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1576155486113-151b27511d3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Airplane on runway" 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-airline-sky mb-3">Safety First</h3>
              <p className="text-gray-700">
                Safety is our top priority. We adhere to the highest international safety 
                standards and maintain our aircraft with rigorous attention to detail.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-airline-sky mb-3">Customer Centricity</h3>
              <p className="text-gray-700">
                We put our customers at the heart of everything we do, striving to exceed 
                expectations and create memorable travel experiences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-airline-sky mb-3">Innovation</h3>
              <p className="text-gray-700">
                We continuously innovate our services, technology, and processes to enhance 
                efficiency and improve the customer experience.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Rajesh Sharma</h3>
              <p className="text-gray-600">Chief Executive Officer</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                  alt="COO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Priya Patel</h3>
              <p className="text-gray-600">Chief Operations Officer</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Vikram Singh</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                  alt="CMO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Anjali Khanna</h3>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-airline-light-gray py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate people to join our growing team. 
            Explore opportunities to be part of our journey.
          </p>
          <Button size="lg" asChild>
            <Link to="/about#careers">View Careers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
