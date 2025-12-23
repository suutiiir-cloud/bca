import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/login";
import ChangePasswordPage from "@/pages/change-password";
import InfoPage from "@/pages/info";
import ChatPage from "@/pages/chat";
import ChatConversationPage from "@/pages/chat-conversation";
import LiveChatPage from "@/pages/live-chat";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/change-password" component={ChangePasswordPage} />
      <Route path="/login" component={InfoPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/live-chat" component={LiveChatPage} />
      <Route path="/chat-conversation" component={ChatConversationPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
