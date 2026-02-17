"use client";

import { useState, useCallback } from "react";

type CopyPromptProps = {
  promptText: string;
  /** When true, prompt is always visible and only the Copy button is shown (no Show prompt toggle). */
  alwaysShowPrompt?: boolean;
};

export function CopyPrompt({ promptText, alwaysShowPrompt = false }: CopyPromptProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const showPrompt = alwaysShowPrompt || expanded;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [promptText]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {!alwaysShowPrompt && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-sm font-semibold text-[#EA3D2A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 rounded"
          >
            {expanded ? "Hide prompt" : "Show prompt"}
          </button>
        )}
        <button
          type="button"
          onClick={copy}
          className="text-sm font-semibold text-[#EA3D2A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 rounded"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {showPrompt && (
        <div className="rounded-lg border border-neutral-200 bg-white p-3">
          <pre className="whitespace-pre-line font-mono text-xs text-neutral-800">
            {promptText}
          </pre>
        </div>
      )}
    </div>
  );
}
