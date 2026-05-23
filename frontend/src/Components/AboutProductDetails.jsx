export default function AboutProductDetails() {
  return (
    <>
      <div className="bg-stone-950 grid grid-cols-1 md:grid-cols-12 min-h-[60vh] items-stretch">
        
        {/* Left Column: Premium Image Container (Spans 5/12 columns on desktop) */}
        <div className="relative md:col-span-5 h-[400px] md:h-auto overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1779547317/daniel-hay-O703kpzIsQI-unsplash_zfv21n.jpg" 
            alt="Luxury watch craftsmanship details" 
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle elegant vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent"></div>
        </div>

        {/* Right Column: Text & Stats Content (Spans 7/12 columns on desktop) */}
        <div className="text-white md:col-span-7 p-8 sm:p-12 md:p-20 flex flex-col justify-center space-y-12 bg-gradient-to-br from-stone-900 to-stone-950">
          
          {/* Section Introduction */}
          <div className="space-y-4 max-w-xl">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-amber-400 font-medium">
              The Collection in Numbers
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-stone-100 leading-tight">
              Uncompromising standards, meticulously curated details.
            </h2>
            <p className="text-sm sm:text-base font-sans font-light text-stone-400 leading-relaxed">
              Every timepiece in our vault passes through a rigorous curation process. We evaluate movement accuracy, heritage value, and physical condition to ensure your investment stands the test of time.
            </p>
          </div>

          {/* Elegant Stats Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-stone-800 pt-10 max-w-xl">
            
            {/* Stat 1 */}
            <div className="space-y-1">
              <h3 className="text-4xl sm:text-5xl font-serif font-light text-amber-100 tracking-tight">
                200+
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-wider text-stone-400 uppercase font-medium">
                Exclusive Timepieces
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <h3 className="text-4xl sm:text-5xl font-serif font-light text-amber-100 tracking-tight">
                100%
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-wider text-stone-400 uppercase font-medium">
                Certified Authentic
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <h3 className="text-4xl sm:text-5xl font-serif font-light text-amber-100 tracking-tight">
                24/7
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-wider text-stone-400 uppercase font-medium">
                Conscierge Support
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1">
              <h3 className="text-4xl sm:text-5xl font-serif font-light text-amber-100 tracking-tight">
                5+
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-wider text-stone-400 uppercase font-medium">
                Years Warranty
              </p>
            </div>

          </div>

        </div>
        
      </div>
    </>
  )
}