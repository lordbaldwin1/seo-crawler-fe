"use client";

import { useRef, useState } from "react";
import Header from "./header";
import { env } from "~/env";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

const header = {
  title: "seo-crawler",
  description: "enter a URL to visualize a graph of its connected pages",
};

export type CrawlURLQueryParameters = {
  url: string;
  maxPages: string;
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
    maxPages: "50",
  });
  const [graphData, setGraphData] = useState<ReactForceGraphShape>({
    nodes: [],
    links: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const GROUPS = 12

  async function handleCrawlURL() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/crawl?url=${queryParams.url}&maxPages=${queryParams.maxPages}`,
      );

      if (!res.ok) {
        const error = (await res.json()) as { error: string };
        setError(`error: ${error.error}`)
        return;
      }
      const data = (await res.json()) as ReactForceGraphShape;
      setGraphData(data);
      setShowGraph(true);
    } catch (err) {
      setError(`${(err as Error).message}`)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section onClick={() => setError("")}>
      {!showGraph ? (
        <div className="flex h-[65vh] flex-col justify-center">
          <Header title={header.title} description={header.description} />
          <section className="w-full space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline rounded-sm p-1 px-2 hover:outline-muted-foreground transition-all duration-200 flex flex-row items-center gap-1">max pages: {queryParams.maxPages} <ChevronDown size={18} /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="sr-only">Panel Position</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={queryParams.maxPages} onValueChange={(value) => setQueryParams(prevParams => ({
                  ...prevParams,
                  maxPages: value
                }))}>
                  <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="75">75</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="125">125</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="150">150</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="175">175</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="200">200</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip open={error.length > 0}>
              <TooltipTrigger asChild>
                <Input
                  ref={inputRef}
                  placeholder="enter a URL..."
                  onClick={() => setError("")}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      await handleCrawlURL();
                    }
                  }}
                  value={queryParams.url}
                  onChange={(e) =>
                    setQueryParams((prevQueryParams) => ({
                      ...prevQueryParams,
                      url: e.target.value,
                    }))
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                {error.length > 0 && (
                  error
                )}
              </TooltipContent>
            </Tooltip>
            <div className="flex w-full items-center justify-center gap-2">
              <Button className="w-1/2" disabled={isLoading ? true : false} onClick={() => {
                setQueryParams(prevParams => ({
                  ...prevParams,
                  url: "",
                }));
                inputRef.current?.focus();
              }}>clear</Button>
              <Button className="w-1/2" onClick={handleCrawlURL} disabled={isLoading ? true : false}>
                {isLoading ? <Loader2 className="animate-spin" /> : "crawl"}
              </Button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="h-[600px] w-[1200px]">
            <ForceGraph3D
              graphData={graphData}
              nodeLabel="id"
              backgroundColor="rgba(0,0,0,0)"
              nodeColor={d => `hsl(${(String(d.id).length % GROUPS) * (360 / GROUPS)}, 70%, 50%)`}
              linkColor={d => {
                const sourceNode = graphData.nodes.find(n => n.id === d.source);
                const colorIndex = sourceNode ? String(sourceNode.id).length % GROUPS : 0;
                return `hsl(${colorIndex * (360 / GROUPS)}, 70%, 50%)`;
              }}
              linkWidth={1}
              nodeRelSize={2}
              height={600}
              width={1200}
            />
          </div>
          <Button className="mt-4" onClick={() => {
            setQueryParams({
              url: "",
              maxPages: "50",
            })
            setShowGraph(false)
          }}>test another site</Button>
        </div>
      )
      }
    </section >
  );
}
