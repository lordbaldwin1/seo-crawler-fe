"use client";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="mb-12 flex flex-row items-center justify-between gap-4">
      <div className="hidden sm:flex items flex-wrap gap-4">
        <Button
          variant={"link"}
          onClick={() => window.location.reload()}
          className="text-foreground hover:text-accent hover:no-underline group flex items-center transition-all duration-200"
        >
          <span>seo-crawler</span>
        </Button>
      </div>

      <div className="sm:hidden">
        seo-crawler
      </div>
      
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}