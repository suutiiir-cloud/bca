import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  type: "user" | "system";
  text: string;
}

export default function LiveChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial message from localStorage
    const initialMessage = localStorage.getItem("chatInitialMessage");
    const initialCorporateId = localStorage.getItem("chatCorporateId");
    
    if (initialMessage && initialCorporateId) {
      setMessages([
        {
          type: "system",
          text: "Selamat datang di Live Chat Support KeyBCA. Tim kami siap membantu Anda.",
        },
        {
          type: "user",
          text: initialMessage,
        },
      ]);
      
      // Clear localStorage
      localStorage.removeItem("chatInitialMessage");
      localStorage.removeItem("chatCorporateId");
    } else {
      // Fallback if no initial message
      setMessages([
        {
          type: "system",
          text: "Selamat datang di Live Chat Support KeyBCA. Tim kami siap membantu Anda.",
        },
      ]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) {
      return;
    }

    // Redirect to LiveChat
    window.location.href = "https://direct.lc.chat/19418089/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-4 md:px-12">
        <div className="flex justify-between items-center">
          <div>
            <img
              src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCCGDGBGOCAHOGHG"
              alt="BCA Logo"
              className="h-8"
            />
          </div>
          <h1 className="text-lg font-semibold text-primary">
            Live Chat Support KeyBCA
          </h1>
          <button
            onClick={() => navigate("/chat")}
            className="text-sm font-medium text-primary hover:opacity-70 transition-opacity"
            data-testid="link-back-to-chat"
          >
            Tutup ✕
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white text-primary border border-gray-300 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-300 px-6 py-4 md:px-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-1 h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
              data-testid="input-live-chat-message"
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim()}
              className="h-11 px-6 rounded-md bg-primary hover:bg-primary/90 text-white font-semibold text-sm whitespace-nowrap disabled:opacity-50"
              data-testid="button-send-live-chat"
            >
              Kirim
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center text-xs py-3"
        style={{ backgroundColor: "#f2f2f2", color: "#1F6198" }}
      >
        Copyright © 2020   All Right Reserved
      </div>
    </div>
  );
}
