"use client";

import CrawlerInput from "~/components/crawler-input";
import Header from "~/components/header";

const header = {
  title: "seo-crawler",
  description: "enter a URL to visualize a graph of its connected pages",
};

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col justify-center h-[65vh]">
        <Header title={header.title} description={header.description} />
        <CrawlerInput />
      </div>
    </main>
  );
}
