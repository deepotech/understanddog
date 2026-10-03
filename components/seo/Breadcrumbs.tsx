import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => {
      const entry: {
        "@type": string;
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };
      if (item.href) {
        entry.item = `${SITE_CONFIG.url}${item.href === "/" ? "" : item.href}`;
      }
      return entry;
    }),
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-slate-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-slate-800 line-clamp-1"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {index === 0 ? (
                      <span className="flex items-center gap-1">
                        <Home className="h-3.5 w-3.5" />
                        <span className="sr-only">Home</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-amber-700 transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="h-3.5 w-3.5" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
