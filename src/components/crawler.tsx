"use client";

import { useState } from "react";
import CrawlerInput from "./crawler-input";
import Header from "./header";
import { env } from "~/env";

const header = {
  title: "seo-crawler",
  description: "enter a URL to visualize a graph of its connected pages",
};

export type CrawlURLQueryParameters = {
  url: string;
  maxPages: number;
};

export type ReactForceGraphShape = {
  nodes: {
    id: string;
  }[];
  links: {
    source: string;
    target: string;
  }[];
};

export default function Crawler() {
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<CrawlURLQueryParameters>({
    url: "",
    maxPages: 50,
  });

  async function handleCrawlURL() {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api?url=${queryParams.url}&maxPages=${queryParams.maxPages}`,
      );

      if (!res.ok) {
        // ADD ERROR HANDLING
      }
    } catch {
    } finally {
      // ADD LOADING STATE
    }
  }
  return (
    <section>
      {!showGraph ? (
        <div className="flex h-[65vh] flex-col justify-center">
          <Header title={header.title} description={header.description} />
          <CrawlerInput />
        </div>
      ) : (
        <div>graph</div>
      )}
    </section>
  );
}
