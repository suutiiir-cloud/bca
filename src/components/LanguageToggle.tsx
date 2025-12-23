import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import type { Language } from "@/lib/i18n";

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  const toggleLanguage = () => {
    onLanguageChange(language === "id" ? "en" : "id");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-9"
      data-testid="button-language-toggle"
    >
      <Languages className="h-4 w-4 mr-2" />
      {language === "id" ? "EN" : "ID"}
    </Button>
  );
}
