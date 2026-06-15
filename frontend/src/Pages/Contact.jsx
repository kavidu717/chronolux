import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] min-h-[300px] lg:h-[50vh]">
        <img
          src="https://res.cloudinary.com/doujmzgn3/image/upload/v1779544358/alexander-andrews-anUOLC3zMD4-unsplash_1_sfavwt.jpg"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay to blend into the black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xl">
            Get in <span className="text-amber-500">Touch.</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed">
            Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content Section (Pulled up slightly over the banner) */}
      <div className="relative z-10 px-6 lg:px-12 pb-24 -mt-10 lg:-mt-16 flex items-center justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 flex flex-col space-y-10 bg-zinc-950/80 backdrop-blur-md p-8 rounded-[2rem] border border-zinc-800 shadow-2xl">
            
            {/* Profile & Admin Info */}
            <div className="flex items-center gap-6 border-b border-zinc-800 pb-8">
              <div className="relative">
                {/* Gold glow effect behind image */}
                <div className="absolute inset-0 bg-amber-500 blur-lg opacity-40 rounded-full animate-pulse"></div>
                
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white tracking-wide">Kavidu</h3>
                <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mt-1">Administrator</p>
              </div>
            </div>
           

            {/* Contact Details List */}
            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-5 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
                  <FaPhoneAlt className="text-amber-500 text-xl" />
                </div>
                <span className="text-lg font-medium text-zinc-300 group-hover:text-amber-500 transition-colors">0773005419</span>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
                  <FaWhatsapp className="text-amber-500 text-2xl" />
                </div>
                <a
                  href="https://wa.me/94773005419"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium text-zinc-300 hover:text-amber-500 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-5 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
                  <FaEnvelope className="text-amber-500 text-xl" />
                </div>
                <span className="text-lg font-medium text-zinc-300 group-hover:text-amber-500 transition-colors break-all">
                  dushmanthakavidu143@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-5 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xl" />
                </div>
                <span className="text-lg font-medium text-zinc-300 group-hover:text-amber-500 transition-colors">
                  Colombo, Sri Lanka
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800 p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
              {/* Top gold gradient line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-75"></div>

              <h2 className="text-3xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-zinc-400 mb-8">Fill out the form below and we will contact you shortly.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-zinc-700 resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => window.open("https://wa.me/94773005419", "_blank")}
                    className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}