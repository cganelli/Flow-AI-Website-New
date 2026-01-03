"use client";

import { useState, useEffect, useRef } from "react";

const SOFTWARE_DISPLAY_ORDER = [
  // Most common corporate
  "Microsoft 365",
  "Google Workspace",
  "Salesforce",
  "ServiceNow",
  "Workday",
  "Jira",
  "Confluence",
  "Zendesk",
  "Slack",
  "Teams",
  "Zoom",
  "Power BI",
  "DocuSign",

  // SMB
  "QuickBooks",
  "Shopify",
  "Mailchimp",
  "Constant Contact",

  // ERP and finance ops
  "SAP",
  "Oracle Fusion Cloud ERP",
  "Microsoft Dynamics 365",

  // Identity and access
  "Okta",
];

type Props = {
  issues: string[];
  functions: string[];
  software: string[];
  selectedIssues: string[];
  selectedFunctions: string[];
  selectedSoftware: string[];
  onToggleIssue: (value: string) => void;
  onToggleFunction: (value: string) => void;
  onToggleSoftware: (value: string) => void;
  onReset: () => void;
};

function MultiSelectDropdown({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getDisplayText = () => {
    if (selected.length === 0) {
      if (title === "Issue") return "All Issues";
      if (title === "Department") return "All Departments";
      if (title === "Software Platform") return "All Software Platforms";
      return `All ${title.toLowerCase()}s`;
    }
    if (selected.length === 1) return selected[0];
    return `${selected.length} selected`;
  };

  const dropdownId = `dropdown-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const buttonId = `button-${title.toLowerCase().replace(/\s+/g, "-")}`;

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={buttonId} className="mb-3 block text-sm font-semibold text-neutral-950">
        {title}
      </label>
      <button
        id={buttonId}
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
        aria-label={`${title} filter, ${getDisplayText()}`}
        className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 text-left text-sm text-neutral-900 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1"
      >
        <span className="block truncate">{getDisplayText()}</span>
        <svg
          className={`ml-2 h-4 w-4 shrink-0 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            id={dropdownId}
            role="listbox"
            className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 bg-white shadow-lg"
          >
            {items.map((item) => {
              const itemId = `${dropdownId}-${item.toLowerCase().replace(/\s+/g, "-")}`;
              const isSelected = selected.includes(item);
              return (
                <label
                  key={item}
                  htmlFor={itemId}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 focus-within:bg-neutral-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    id={itemId}
                    type="checkbox"
                    role="option"
                    aria-selected={isSelected}
                    className="h-4 w-4 rounded border-black/20 accent-[#EA3D2A] focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1"
                    checked={isSelected}
                    onChange={() => onToggle(item)}
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function Filters(props: Props) {
  const hasAny =
    props.selectedIssues.length > 0 ||
    props.selectedFunctions.length > 0 ||
    props.selectedSoftware.length > 0;

  // Sort software options using display order
  const orderIndex = (name: string) => {
    const idx = SOFTWARE_DISPLAY_ORDER.indexOf(name);
    return idx === -1 ? 9999 : idx;
  };

  const softwareOptionsSorted = [...props.software].sort((a, b) => {
    const ai = orderIndex(a);
    const bi = orderIndex(b);

    if (ai !== bi) return ai - bi;

    const an = a.toLowerCase();
    const bn = b.toLowerCase();
    return an.localeCompare(bn);
  });

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-neutral-950">Select</div>
        <button
          type="button"
          onClick={props.onReset}
          aria-label="Reset all filters"
          className="text-sm font-semibold text-[#EA3D2A] hover:underline disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 rounded"
          disabled={!hasAny}
        >
          Reset filters
        </button>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MultiSelectDropdown
          title="Issue"
          items={props.issues}
          selected={props.selectedIssues}
          onToggle={props.onToggleIssue}
        />
        <MultiSelectDropdown
          title="Department"
          items={props.functions}
          selected={props.selectedFunctions}
          onToggle={props.onToggleFunction}
        />
        <MultiSelectDropdown
          title="Software Platform"
          items={softwareOptionsSorted}
          selected={props.selectedSoftware}
          onToggle={props.onToggleSoftware}
        />
      </div>
    </section>
  );
}
