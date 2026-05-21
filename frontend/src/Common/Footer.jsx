import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#D4AF37]/30 text-gray-400 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div>
          <div className="text-2xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-6">
            LUXE WATCHES
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Elevating time with precision and luxury. Discover our exclusive collection of premium timepieces crafted for elegance and durability.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-200 text-lg font-bold tracking-wider uppercase mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/" className="hover:text-[#D4AF37] transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#D4AF37] transition-colors duration-300">Shop Collection</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#D4AF37] transition-colors duration-300">Our Story</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#D4AF37] transition-colors duration-300">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-gray-200 text-lg font-bold tracking-wider uppercase mb-6">Customer Care</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/faq" className="hover:text-[#D4AF37] transition-colors duration-300">FAQ</Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-[#D4AF37] transition-colors duration-300">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="/warranty" className="hover:text-[#D4AF37] transition-colors duration-300">Warranty</Link>
            </li>
            <li>
              <Link to="/care" className="hover:text-[#D4AF37] transition-colors duration-300">Watch Care</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-gray-200 text-lg font-bold tracking-wider uppercase mb-6">Stay in the Loop</h3>
          <p className="text-sm mb-4">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700 w-full"
            />
            <button 
              type="button" 
              className="bg-[#D4AF37] text-black py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
        <p>&copy; {new Date().getFullYear()} Luxe Watches. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors duration-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#D4AF37] transition-colors duration-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}