import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // වත්මන් URL එක (path) ලබා ගැනීම
  const { pathname } = useLocation();

  useEffect(() => {
    // URL එක වෙනස් වන සෑම විටම පිටුව ඉහළට (0,0) ගෙන යන්න
    window.scrollTo({
      top: 0,
      behavior: "smooth" // ඉතා සුමටව (smooth) ඉහළට යාම සඳහා
    });
  }, [pathname]); // pathname වෙනස් වන විට පමණක් ක්‍රියාත්මක වේ

  return null; // මෙයට දෘශ්‍යමාන UI එකක් නැත
}