import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="mb-12 flex flex-row items-center justify-between gap-4">
      <div className="hidden sm:flex items flex-wrap gap-4">
        <Link
          href={"/"}
          className="hover:text-accent group flex items-center transition-all duration-200"
        >
          <span>seo-crawler</span>
        </Link>
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