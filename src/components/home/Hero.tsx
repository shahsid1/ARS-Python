
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative bg-airline-soft-blue-gray text-foreground">
      <div className="absolute inset-0 bg-gradient-to-r from-airline-deep-navy to-airline-dusty-blue opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(89,127,151,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(24,50,81,0.1),transparent_50%)]"></div>
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-airline-light-beige">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl opacity-90 text-white mb-8">
            Search flights to destinations across India and find the best deals on airfare
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
