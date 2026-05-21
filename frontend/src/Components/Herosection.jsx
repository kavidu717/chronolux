import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] bg-black flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <img 
        src="https://res.cloudinary.com/doujmzgn3/image/upload/v1779370152/paul-cuoco-CO2vOhPqlrM-unsplash_ubhbo8.jpg" 
        alt="Luxury Watch Collection" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
      />

      {/* Dark Gradient Overlay (Improves text readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a]"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        
        <p className="text-[#D4AF37] uppercase tracking-[0.3em] font-bold text-sm md:text-base mb-4 drop-shadow-md">
          The New Standard of Precision
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-xl">
          Timeless Elegance
        </h1>
        
        <p className="text-gray-300 text-sm md:text-lg mb-10 leading-relaxed max-w-2xl drop-shadow-md">
          Discover our exclusive collection of premium timepieces. Crafted with uncompromising attention to detail for those who appreciate the finest things in life.
        </p>
        
        {/* Shop Button */}
        <Link 
          to="/shop" 
          className="bg-[#D4AF37] text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
        >
          Explore Collection
        </Link>

      </div>
    </div>
  );
}