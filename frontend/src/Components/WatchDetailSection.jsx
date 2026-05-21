import { Link } from "react-router-dom";

export default function WatchDetailSection() {
  return (
    <section className="bg-black py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* ================= IMAGE SECTION ================= */}
        <div className="relative group">
          {/* Decorative Offset Gold Border */}
          <div className="absolute inset-0 border border-[#D4AF37]/40 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 rounded-sm"></div>
          
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-sm bg-[#0a0a0a] z-10 shadow-2xl">
            <img 
              src="https://res.cloudinary.com/doujmzgn3/image/upload/v1779374267/peng-productions-kdCAFbPVbCs-unsplash_yx1yfd.jpg" 
              alt="Casio G-Shock Tactical Watch" 
              className="w-full h-auto object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-in-out" 
            />
          </div>
        </div>

        {/* ================= TEXT SECTION ================= */}
        <div className="flex flex-col justify-center">
          
          <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-bold mb-4 drop-shadow-sm">
            Master of Resilience
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-100 mb-6 leading-tight">
            G-SHOCK Tactical Series
          </h2>
          
          <p className="text-gray-400 leading-relaxed mb-8">
            Engineered for the extreme. The G-Shock collection bridges the gap between rugged durability and tactical precision. Forged with a shock-resistant core and a menacing matte black aesthetic, it is the ultimate timepiece for those who refuse to compromise under pressure.
          </p>

          {/* Feature List */}
          <ul className="space-y-4 mb-10 text-sm tracking-wide text-gray-300">
            <li className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></span>
              Absolute Toughness & Shock Resistance
            </li>
            <li className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></span>
              200-Meter Water Resistance
            </li>
            <li className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></span>
              Multi-Band 6 Atomic Timekeeping
            </li>
          </ul>

          {/* CTA Button */}
          <Link 
            to="/shop?brand=Casio" 
            className="inline-block text-center w-full md:w-max border border-[#D4AF37] text-[#D4AF37] px-10 py-3.5 rounded-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-lg"
          >
            Discover G-Shock
          </Link>

        </div>
        
      </div>
    </section>
  );
}