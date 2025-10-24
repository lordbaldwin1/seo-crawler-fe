"use client";

import { useState } from "react";
import Header from "./header";
import { env } from "~/env";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

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
  const [graphData, setGraphData] = useState<ReactForceGraphShape>({
    nodes: [],
    links: [],
  });
  const GROUPS = 12

  async function handleCrawlURL() {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/crawl?url=${queryParams.url}&maxPages=${queryParams.maxPages}`,
      );

      if (!res.ok) {
        // ADD ERROR HANDLING
        return;
      }
      const data = (await res.json()) as ReactForceGraphShape;
      setGraphData(data);
      setShowGraph(true);
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
          <section className="w-full space-y-6">
            <Input
              placeholder="Enter a URL..."
              value={queryParams.url}
              onChange={(e) =>
                setQueryParams((prevQueryParams) => ({
                  ...prevQueryParams,
                  url: e.target.value,
                }))
              }
            />
            <div className="flex w-full items-center justify-center gap-2">
              <Button className="w-1/2">Clear</Button>
              <Button className="w-1/2" onClick={handleCrawlURL}>
                Crawl
              </Button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ForceGraph3D
          graphData={graphData}
          nodeLabel="id"
          backgroundColor="rgba(0,0,0,0)"
          nodeColor={d => `hsl(${(String(d.id).length%GROUPS) * (360/GROUPS)}, 70%, 50%)`}
          linkColor={d => {
            const sourceNode = graphData.nodes.find(n => n.id === d.source);
            const colorIndex = sourceNode ? String(sourceNode.id).length%GROUPS : 0;
            return `hsl(${colorIndex * (360/GROUPS)}, 70%, 50%)`;
          }}
          linkWidth={1}
          nodeRelSize={2}
          height={600}
          width={1200}
        />
        </div>
      )}
    </section>
  );
}
