import AboutProductDetails from "../Components/AboutProductDetails";

export default function About() {
  return (
    <>
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1779544358/alexander-andrews-anUOLC3zMD4-unsplash_1_sfavwt.jpg" 
            alt="Luxury modern watch showcase" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay to make the text pop */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Foreground Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 px-6 max-w-3xl mx-auto">
          
          {/* 'Since 2026' Accent */}
          <div className="flex items-center space-x-4">
            <span className="h-[1px] w-12 bg-amber-400/70"></span>
            <p className="text-xs md:text-sm font-sans tracking-[0.25em] uppercase text-stone-200 font-medium">
              Since 2026
            </p>
            <span className="h-[1px] w-12 bg-amber-400/70"></span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-white capitalize leading-tight drop-shadow-lg">
            Luxury watches <br />
            <span className="italic font-normal text-amber-100">from one place.</span>
          </h1>
          
          {/* Subtitle / Description */}
          <p className="text-sm md:text-lg font-sans text-stone-200 max-w-xl leading-relaxed font-light drop-shadow-md">
            Curating timepieces that marry mid-century elegance with contemporary precision. Explore a legacy built on sophistication.
          </p>
          
        </div>
        
        {/* Subtle border accent common in mid-century digital designs */}
        <div className="absolute inset-0 border-[16px] border-white/10 pointer-events-none z-20"></div>
        
      </section>
        
      {/* Our Story Section */}
      <section className="bg-[#fcfbfa] py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          
          {/* Heading Side (Left) */}
          <div className="md:w-1/3 shrink-0">
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-900 leading-tight">
              Our <br className="hidden md:block" /> Story
            </h2>
            <div className="h-px w-16 bg-amber-700/60 mt-6"></div>
          </div>

          {/* Content Side (Right) */}
          <div className="md:w-2/3 space-y-6 text-stone-600 font-sans font-light text-base md:text-lg leading-relaxed">
            <p>
              At the intersection of horological mastery and timeless design, our collection represents the pinnacle of craftsmanship. We curate exceptional timepieces that tell more than just time—they tell a story of heritage, complex mechanical precision, and uncompromising elegance.
            </p>
            <p>
              This digital boutique was engineered to bridge the gap between traditional luxury and modern convenience. Built on a robust, highly responsive architecture, our platform provides collectors with a seamless and secure environment to explore, appreciate, and acquire the world’s finest watches from anywhere. Every element of this application has been carefully crafted to reflect the sophisticated nature and precision of the timepieces we offer.
            </p>
          </div>

        </div>
      </section>

     < AboutProductDetails />
    </>
  )
}