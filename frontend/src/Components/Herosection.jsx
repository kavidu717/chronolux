import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef([]);

  const totalFrames = 208;

  useEffect(() => {
    let active = true;
    const loadedImages = [];
    let loadedCount = 0;

    // Preload the frames in the background
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        // Start playing as soon as a decent buffer (e.g. 30 frames / 1 second) is loaded
        if (loadedCount >= 30) {
          setIsReady(true);
        }
      };
      loadedImages.push(img);
    }
    
    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let currentFrame = 0;
    let lastTime = 0;
    const fps = 30;
    const fpsInterval = 1000 / fps;

    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      const images = imagesRef.current;
      const img = images[currentFrame];

      // Draw only if the image has finished loading
      if (img && img.complete && img.naturalWidth !== 0) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let offsetX = 0;
        let offsetY = 0;

        // Custom object-fit: cover algorithm for canvas
        if (canvasRatio > imgRatio) {
          drawHeight = canvasWidth / imgRatio;
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          drawWidth = canvasHeight * imgRatio;
          offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        currentFrame = (currentFrame + 1) % totalFrames;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isReady]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[80vh] md:h-[90vh] bg-black flex items-center justify-center overflow-hidden"
    >
     

      {/* High-Performance Animation Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none ${
          isReady ? "opacity-60" : "opacity-0"
        }`}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a] pointer-events-none"></div>

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