import { Link, useLocation } from "wouter";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [location] = useLocation();
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 6v12l10 4 10-4V6L12 2zm-1 15.93l-6-2.4V8.07l6 2.4v7.46zm-4-10.76L12 4.07l5 2.1L12 8.27 7 6.17zm11 8.36l-6 2.4v-7.46l6-2.4v7.46z" />
              </svg>
              <Link href="/">
                <span className="ml-2 text-xl font-bold text-primary cursor-pointer">ClaimVerify</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`${
                  location === "/" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Claims
              </Link>
              {/*<a href="#" className="border-transparent text-muted-foreground hover:border-muted hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">*/}
              {/*  Dashboard*/}
              {/*</a>*/}
              {/*<a href="#" className="border-transparent text-muted-foreground hover:border-muted hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">*/}
              {/*  Analytics*/}
              {/*</a>*/}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/*<div className="flex-shrink-0">*/}
            {/*  <Button>*/}
            {/*    <PlusIcon className="h-5 w-5 mr-2" />*/}
            {/*    New Claim*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </header>
  );
}
