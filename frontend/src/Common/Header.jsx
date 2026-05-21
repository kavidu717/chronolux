import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiMenu, HiX } from "react-icons/hi";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-black text-gray-200 border-b border-[#D4AF37]/30 shadow-md relative z-50">
            <div className="px-6 md:px-8 py-5 flex items-center justify-between">
                
                {/* Logo Section */}
                <div className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase z-50">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>LUXE WATCHES</Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-8 font-medium tracking-wide">
                    <Link to="/" className="hover:text-[#D4AF37] transition-colors duration-300">
                        Home
                    </Link>
                    <Link to="/shop" className="hover:text-[#D4AF37] transition-colors duration-300">
                        Shop
                    </Link>
                    <Link to="/about" className="hover:text-[#D4AF37] transition-colors duration-300">
                        About
                    </Link>

                    {/* Vertical Divider line */}
                    <div className="h-6 w-px bg-gray-700"></div>

                    <Link to="/cart" className="hover:text-[#D4AF37] transition-colors duration-300">
                        <HiOutlineShoppingBag className="text-2xl" />
                    </Link>

                    <Link to="/login" className="hover:text-[#D4AF37] transition-colors duration-300">
                        Login
                    </Link>

                    {/* Styled Register Button */}
                    <Link 
                        to="/register" 
                        className="bg-[#D4AF37] text-black px-6 py-2 rounded-sm font-semibold hover:bg-[#b5952f] transition-colors duration-300"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Icons (Cart & Hamburger Menu) */}
                <div className="md:hidden flex items-center space-x-5 z-50">
                    <Link to="/cart" className="hover:text-[#D4AF37] transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                        <HiOutlineShoppingBag className="text-2xl" />
                    </Link>
                    <button 
                        onClick={toggleMenu} 
                        className="text-[#D4AF37] focus:outline-none hover:text-[#b5952f] transition-colors"
                    >
                        {isMenuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu Dropdown */}
            <div 
                className={`md:hidden absolute top-full left-0 w-full bg-black border-b border-[#D4AF37]/30 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-100 visible h-auto py-6 flex flex-col" : "opacity-0 invisible h-0 py-0"
                } items-center space-y-6 font-medium tracking-wide`}
            >
                <Link to="/" onClick={toggleMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
                    Home
                </Link>
                <Link to="/shop" onClick={toggleMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
                    Shop
                </Link>
                <Link to="/about" onClick={toggleMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
                    About
                </Link>
                
                <div className="w-24 h-px bg-gray-700 my-2"></div>

                <Link to="/login" onClick={toggleMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
                    Login
                </Link>
                <Link 
                    to="/register" 
                    onClick={toggleMenu}
                    className="bg-[#D4AF37] text-black px-8 py-2 rounded-sm font-semibold hover:bg-[#b5952f] transition-colors duration-300 inline-block"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}