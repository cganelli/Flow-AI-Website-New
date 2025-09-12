"use client";

import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./error-boundary";

interface DynamicSectionProps {
  component: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  [key: string]: unknown;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center py-16">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading section...</span>
  </div>
);

export function DynamicSection({
  component,
  fallback = <DefaultFallback />,
  errorFallback,
  ...props
}: DynamicSectionProps) {
  const LazyComponent = lazy(component);

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
