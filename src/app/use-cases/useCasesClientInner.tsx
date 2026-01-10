"use client";

import { useMemo, useState } from "react";
import Filters from "@/components/use-cases/Filters";
import UseCaseCard from "@/components/use-cases/UseCaseCard";
import {
  USE_CASES,
  getAllFunctions,
  getAllIssues,
  getAllSoftware,
} from "@/content/useCases";
import type { UseCaseTier } from "@/lib/useCaseTypes";

type TierTab = "All" | UseCaseTier;

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${label}${active ? ", currently selected" : ""}`}
      className={[
        "rounded-lg px-6 py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-2",
        active
          ? "bg-[#EA3D2A] text-white"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function UseCasesClientInner() {
  const [tierTab, setTierTab] = useState<TierTab>("All");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);

  const issues = useMemo(() => getAllIssues(), []);
  const functions = useMemo(() => getAllFunctions(), []);
  const software = useMemo(() => getAllSoftware(), []);

  const filtered = useMemo(() => {
    return USE_CASES.filter((u) => {
      if (tierTab !== "All" && u.tier !== tierTab) return false;

      if (selectedIssues.length > 0 && !selectedIssues.includes(u.issue)) return false;

      if (selectedFunctions.length > 0 && !selectedFunctions.includes(u.function))
        return false;

      if (selectedSoftware.length > 0) {
        const match = u.software.some((s) => selectedSoftware.includes(s));
        if (!match) return false;
      }

      return true;
    });
  }, [tierTab, selectedIssues, selectedFunctions, selectedSoftware]);

  const onReset = () => {
    setSelectedIssues([]);
    setSelectedFunctions([]);
    setSelectedSoftware([]);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredWithSearch = useMemo(() => {
    if (!searchTerm.trim()) return filtered;
    const searchLower = searchTerm.toLowerCase();
    return filtered.filter((u) =>
      u.title.toLowerCase().includes(searchLower) ||
      u.subtitle.toLowerCase().includes(searchLower) ||
      u.workflowLabel.toLowerCase().includes(searchLower) ||
      u.issue.toLowerCase().includes(searchLower) ||
      u.function.toLowerCase().includes(searchLower) ||
      u.software.some((s) => s.toLowerCase().includes(searchLower))
    );
  }, [filtered, searchTerm]);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Use Cases
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Pick an issue. Pick a department. Pick the software. Each use case shows one AI solution to accelerate your business.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <label htmlFor="use-cases-search" className="sr-only">Search use cases</label>
                <input
                  id="use-cases-search"
                  type="text"
                  placeholder="Search all use cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-gray-500 mt-2">
                  Found {filteredWithSearch.length} result{filteredWithSearch.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pt-4 pb-8 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            <TabButton
              label="All Use Cases"
              active={tierTab === "All"}
              onClick={() => setTierTab("All")}
            />
            <TabButton
              label="Foundation"
              active={tierTab === "Foundation"}
              onClick={() => setTierTab("Foundation")}
            />
            <TabButton
              label="Growth"
              active={tierTab === "Growth"}
              onClick={() => setTierTab("Growth")}
            />
            <TabButton
              label="Transform"
              active={tierTab === "Transform"}
              onClick={() => setTierTab("Transform")}
            />
          </div>
        </div>
      </section>

      {/* Filters and Results Section */}
      <section className="py-10 bg-background">
        <div className="container-custom">
          <div className="mt-8">
            <Filters
              issues={issues}
              functions={functions}
              software={software}
              selectedIssues={selectedIssues}
              selectedFunctions={selectedFunctions}
              selectedSoftware={selectedSoftware}
              onToggleIssue={(v) => setSelectedIssues((prev) => toggleValue(prev, v))}
              onToggleFunction={(v) =>
                setSelectedFunctions((prev) => toggleValue(prev, v))
              }
              onToggleSoftware={(v) =>
                setSelectedSoftware((prev) => toggleValue(prev, v))
              }
              onReset={onReset}
            />
          </div>

          <p className="mt-8 text-sm text-neutral-700" aria-live="polite" aria-atomic="true">
            Showing {filteredWithSearch.length} use case{filteredWithSearch.length !== 1 ? "s" : ""}
          </p>

          {filteredWithSearch.length === 0 ? (
            <div className="mt-8 text-center py-12" aria-live="polite" aria-atomic="true">
              <p className="text-lg font-semibold text-neutral-900">No use cases match your filters</p>
              <p className="mt-2 text-sm text-neutral-600">Try adjusting your selections to see more results.</p>
            </div>
          ) : (
            <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filteredWithSearch.map((u) => (
                <li key={u.slug} className="flex">
                  <UseCaseCard useCase={u} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
