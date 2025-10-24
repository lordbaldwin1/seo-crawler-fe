"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CrawlerInput() {
  return (
    <section className="space-y-6 w-full">
      <Input placeholder="Enter a URL..." />
      <div className="flex items-center justify-center gap-2 w-full">
        <Button className="w-1/2">Clear</Button>
        <Button className="w-1/2">Crawl</Button>
      </div>
    </section>
  );
}
