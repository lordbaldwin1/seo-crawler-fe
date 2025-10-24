import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="mb-12 flex flex-row items-center justify-end sm:justify-between gap-4">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex items flex-wrap gap-4">
        <Link
          href={"/"}
          className="hover:text-accent group flex items-center transition-all duration-200"
        >
          <span>seo-crawler</span>
        </Link>
      </div>
      
      {/* Desktop Theme Toggle */}
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="sm:hidden flex justify-end">
        <Sheet>
          <SheetTrigger asChild className="-mb-4">
            <button className="hover:text-accent transition-colors">
              <Menu />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>navigation</SheetTitle>
              <SheetDescription>
                tap the links to navigate.
              </SheetDescription>
            </SheetHeader>
              <div className="flex flex-col gap-6 ml-6">
                <SheetClose asChild>
                  <Link
                    href={"/"}
                    className="hover:text-accent group flex items-center transition-all duration-200"
                  >
                    <span>home</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={"/projects"}
                    className="hover:text-accent group flex items-center transition-all duration-200"
                  >
                    <span>projects</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={"/resume"}
                    className="hover:text-accent group flex items-center transition-all duration-200"
                  >
                    <span>résumé</span>
                  </Link>
                </SheetClose>
                <div>
                  <ThemeToggle />
                </div>
              </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}