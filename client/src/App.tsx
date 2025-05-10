import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ClaimDetail from "@/pages/ClaimDetail";
import Navbar from "@/components/Navbar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/claims/:id" component={ClaimDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Router />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
