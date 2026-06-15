import { useState, useRef, useEffect } from "react";
import { HiX, HiPaperAirplane } from "react-icons/hi";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Luxe Watches. How can I help you today?", sender: "bot" }
  ]);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setMessages((prev) => [...prev, { text: "Thinking...", sender: "bot", isLoading: true }]);

    try {
     
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      setMessages((prev) => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, { text: data.reply, sender: "bot" }];
      });
    } catch (error) {
      setMessages((prev) => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, { text: "Sorry, connection failed.", sender: "bot" }];
      });
    }
  };

  return (
    <>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 z-50 flex items-center justify-center overflow-hidden border-2 ${
          isOpen 
            ? "bg-red-900 border-red-500 text-white hover:bg-red-600" 
            : "bg-black border-[#D4AF37] hover:scale-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
        }`}
      >
        {isOpen ? (
          <HiX className="text-3xl" />
        ) : (
          <img 
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1781526203/luthfi-alfarizi-0piYmLeSgTQ-unsplash_tjvylx.jpg" 
            alt="Assistant" 
            className="w-full h-full object-cover"
          />
        )}
      </button>

      
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-[#0a0a0a] border border-[#D4AF37]/30 shadow-2xl rounded-sm flex flex-col transition-all duration-300 z-50 overflow-hidden ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto h-[450px]" : "opacity-0 translate-y-10 pointer-events-none h-0"
        }`}
      >
        <div className="bg-black border-b border-[#D4AF37]/30 p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold font-serif">L</div>
          <div>
            <h3 className="text-[#D4AF37] font-serif uppercase tracking-widest text-sm font-bold">Luxe Assistant</h3>
            <p className="text-green-500 text-[10px] tracking-wider uppercase font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#111] custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 text-sm rounded-sm ${
                  msg.sender === "user" ? "bg-[#D4AF37] text-black font-medium" : "bg-black border border-gray-700 text-gray-300"
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 bg-black border-t border-[#D4AF37]/20 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our watches..."
            className="flex-1 bg-[#1a1a1a] border border-gray-800 text-white px-4 py-2 rounded-sm focus:outline-none focus:border-[#D4AF37] text-sm"
          />
          <button type="submit" className="bg-[#D4AF37] text-black px-4 py-2 rounded-sm hover:bg-white transition-colors">
            <HiPaperAirplane className="text-lg transform rotate-90" />
          </button>
        </form>
      </div>
    </>
  );
}