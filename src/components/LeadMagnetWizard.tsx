// Purpose: Client-side lead magnet quiz wizard with persistence and results display. Location: src/components/LeadMagnetWizard.tsx
// UI version: 4 — Question 1 first (no intro), 7-day grid results
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildCalendlyUrl, getOptionLabel, getPlan, getPlanKeyFromQ3 } from "../app/lead-magnet/logic";
import { saveSubmission } from "@/lib/leadMagnet/storage";
import { PlansDayGrid } from "../app/lead-magnet/PlansDayGrid";
import { questions } from "../app/lead-magnet/questions";
import type { LeadAnswers } from "../app/lead-magnet/logic";

const STORAGE_KEY = "flowai_leadmagnet_v3";

const QUESTIONS_START_STEP = 0;
const QUESTIONS_END_STEP = 4;
const EMAIL_STEP = 5;
const RESULTS_STEP = 6;

const defaultAnswers: LeadAnswers = {
  q1Role: "",
  q2Goal: "",
  q3Pileup: "",
  q4Start: "",
  q5Lost: "",
};

type UTMParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

type LeadEventType = "lead_captured" | "kit_requested";

type StoredState = {
  currentStepIndex: number;
  answers: LeadAnswers;
  email: string;
  websiteUrl?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function encodeNetlifyForm(data: Record<string, string>) {
  const formPayload = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    formPayload.append(key, value);
  }
  return formPayload.toString();
}

type LeadMagnetWizardProps = {
  inModal?: boolean;
  /** When provided (e.g. in modal), called before navigating to results so the modal can close. */
  onBeforeResultsNavigate?: () => void;
};

export function LeadMagnetWizard({ inModal, onBeforeResultsNavigate }: LeadMagnetWizardProps = {}) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(QUESTIONS_START_STEP);
  const [answers, setAnswers] = useState<LeadAnswers>(defaultAnswers);
  const [email, setEmail] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [websiteUrlInput, setWebsiteUrlInput] = useState<string>("");
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [websiteUrlError, setWebsiteUrlError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [kitSent, setKitSent] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [utm, setUtm] = useState<UTMParams>({});
  const hasHydrated = useRef(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const planKey = getPlanKeyFromQ3(answers.q3Pileup);
  const plan = getPlan(planKey);
  const calendlyBaseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
  const calendlyUrl = plan ? buildCalendlyUrl(calendlyBaseUrl, email, answers, plan) : "";
  const safePlan = plan ?? null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<StoredState>;
        if (typeof parsed.currentStepIndex === "number") {
          const step = Math.max(0, Math.min(parsed.currentStepIndex, RESULTS_STEP));
          setCurrentStepIndex(step);
        }
        if (parsed.answers) {
          setAnswers({ ...defaultAnswers, ...parsed.answers });
        }
        if (parsed.email) {
          setEmail(parsed.email);
          setEmailInput(parsed.email);
        }
        if (parsed.websiteUrl) {
          setWebsiteUrlInput(parsed.websiteUrl);
        }
      } catch (error) {
        console.error("Failed to parse lead magnet storage:", error);
      }
    }

    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get("utm_source") ?? undefined,
      medium: params.get("utm_medium") ?? undefined,
      campaign: params.get("utm_campaign") ?? undefined,
      content: params.get("utm_content") ?? undefined,
      term: params.get("utm_term") ?? undefined,
    });

    hasHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hasHydrated.current || typeof window === "undefined") {
      return;
    }
    const payload: StoredState = {
      currentStepIndex,
      answers,
      email,
      ...(websiteUrlInput && { websiteUrl: websiteUrlInput }),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [currentStepIndex, answers, email, websiteUrlInput]);

  useEffect(() => {
    if (currentStepIndex === EMAIL_STEP) {
      emailInputRef.current?.focus();
    }
  }, [currentStepIndex]);

  useEffect(() => {
    if (currentStepIndex >= RESULTS_STEP && !email) {
      setCurrentStepIndex(EMAIL_STEP);
    }
  }, [currentStepIndex, email]);

  const isQuestionStep = currentStepIndex >= QUESTIONS_START_STEP && currentStepIndex <= QUESTIONS_END_STEP;
  const questionIndex = isQuestionStep ? currentStepIndex - QUESTIONS_START_STEP : -1;
  const question = isQuestionStep ? questions[questionIndex] : null;
  const selectedValue = question ? answers[question.id] : "";
  const canEmailKit = Boolean(email);

  const updateAnswer = (questionId: keyof LeadAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStepIndex < RESULTS_STEP) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, QUESTIONS_START_STEP));
  };

  const resetFlow = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setCurrentStepIndex(QUESTIONS_START_STEP);
    setAnswers(defaultAnswers);
    setEmail("");
    setEmailInput("");
    setWebsiteUrlInput("");
    setFirstNameInput("");
    setLastNameInput("");
    setEmailError("");
    setWebsiteUrlError("");
    setFirstNameError("");
    setLastNameError("");
    setKitSent(false);
  };

  const postToLeadsApi = async (
    eventType: LeadEventType,
    emailOverride?: string,
    firstNameOverride?: string,
    lastNameOverride?: string,
    websiteUrlOverride?: string
  ) => {
    const leadEmail = emailOverride ?? email;
    const payload = {
      event_type: eventType,
      email: leadEmail,
      firstName: firstNameOverride ?? firstNameInput.trim(),
      lastName: lastNameOverride ?? lastNameInput.trim(),
      websiteUrl: websiteUrlOverride ?? websiteUrlInput.trim(),
      answers: {
        q1: answers.q1Role,
        q2: answers.q2Goal,
        q3: answers.q3Pileup,
        q4: answers.q4Start,
        q5: answers.q5Lost,
      },
      plan_key: plan.key,
      plan_name: plan.name,
      createdAt: new Date().toISOString(),
      pagePath: "/lead-magnet",
      utm:
        utm.source ?? utm.medium ?? utm.campaign ?? utm.content ?? utm.term
          ? {
              source: utm.source,
              medium: utm.medium,
              campaign: utm.campaign,
              content: utm.content,
              term: utm.term,
            }
          : undefined,
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.warn("Lead API returned", res.status);
      }
    } catch (error) {
      console.warn("Lead API post failed (e.g. static deploy):", error);
    }
  };

  const submitNetlifyForm = async (
    eventType: LeadEventType,
    emailOverride?: string,
    subject = "7-Day Plan",
    first_name?: string,
    last_name?: string,
    website_url?: string
  ) => {
    const leadEmail = emailOverride ?? email;
    const payload: Record<string, string> = {
      "form-name": "lead-magnet",
      subject,
      event_type: eventType,
      email: leadEmail,
      first_name: first_name ?? firstNameInput.trim(),
      last_name: last_name ?? lastNameInput.trim(),
      website_url: website_url ?? websiteUrlInput.trim(),
      q1: answers.q1Role,
      q2: answers.q2Goal,
      q3: answers.q3Pileup,
      q4: answers.q4Start,
      q5: answers.q5Lost,
      plan_key: plan.key,
      plan_name: plan.name,
      pagePath: "/lead-magnet",
      utm_source: utm.source ?? "",
      utm_medium: utm.medium ?? "",
      utm_campaign: utm.campaign ?? "",
      utm_content: utm.content ?? "",
      utm_term: utm.term ?? "",
      createdAt: new Date().toISOString(),
    };
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeNetlifyForm(payload),
      });
    } catch (error) {
      console.error("Netlify form submit failed:", error);
    }
  };

  const handleEmailSubmit = () => {
    setEmailError("");
    setWebsiteUrlError("");
    setFirstNameError("");
    setLastNameError("");
    const firstName = firstNameInput.trim();
    const lastName = lastNameInput.trim();
    const websiteUrl = websiteUrlInput.trim();
    if (!firstName) {
      setFirstNameError("First name is required.");
      return;
    }
    if (!lastName) {
      setLastNameError("Last name is required.");
      return;
    }
    if (!isValidEmail(emailInput)) {
      setEmailError("Enter a valid work email.");
      return;
    }
    if (!websiteUrl) {
      setWebsiteUrlError("Website URL is required.");
      return;
    }
    const nextEmail = emailInput.trim();
    setEmail(nextEmail);
    // Save new-format submission for /lead-magnet/results and DIY plan pages (Q2 = option labels for exact match)
    saveSubmission({
      firstName,
      lastName,
      email: nextEmail,
      websiteUrl,
      answers: {
        a1Outcome: getOptionLabel("q2Goal", answers.q2Goal),
        a2WorkPilesUp: getOptionLabel("q3Pileup", answers.q3Pileup),
        a3WorkStarts: getOptionLabel("q4Start", answers.q4Start),
        a4MissedOpportunity: getOptionLabel("q5Lost", answers.q5Lost),
        a5Role: getOptionLabel("q1Role", answers.q1Role),
      },
      timestampIso: new Date().toISOString(),
      utm: {
        ...(utm.source && { utm_source: utm.source }),
        ...(utm.medium && { utm_medium: utm.medium }),
        ...(utm.campaign && { utm_campaign: utm.campaign }),
        ...(utm.content && { utm_content: utm.content }),
        ...(utm.term && { utm_term: utm.term }),
      },
      path: "/lead-magnet",
    });
    void postToLeadsApi("lead_captured", nextEmail, firstName, lastName, websiteUrl);
    void submitNetlifyForm("lead_captured", nextEmail, "7-Day Plan", firstName, lastName, websiteUrl);
    onBeforeResultsNavigate?.();
    router.push("/lead-magnet/results");
  };

  const handleKitRequest = async () => {
    if (!canEmailKit || kitSent) {
      return;
    }
    await postToLeadsApi("kit_requested");
    setKitSent(true);
  };

  const renderQuestion = () => {
    if (!question) {
      return null;
    }
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-base-content/70" aria-live="polite">
            Question {questionIndex + 1} of 5
          </p>
          <h2 className="text-2xl font-semibold">{question.prompt}</h2>
        </div>
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`rounded-lg border-2 w-full py-4 px-4 text-left text-base transition-colors ${
                  isSelected
                    ? "border-[#E85B46] bg-[#E85B46] text-white font-bold"
                    : "border-base-300 bg-white text-base-content font-normal hover:border-base-content/20"
                }`}
                aria-pressed={isSelected}
                onClick={() => {
                  updateAnswer(question.id, option.value);
                  setTimeout(() => handleNext(), 400);
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {questionIndex >= 1 && (
          <div>
            <button className="btn btn-ghost" onClick={handleBack} type="button">
              Back
            </button>
          </div>
        )}
      </div>
    );
  };

  const inputOutlineClass = "input input-bordered w-full border-2 border-neutral-300 rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const renderEmailGate = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Your plan is ready</h2>
        <p className="text-base text-base-content/80">
          Enter your first name, last name, email, and website URL to unlock your 7-day plan.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-neutral-300">
        <label className="form-control w-full gap-1">
          <span className="sr-only">First name (required)</span>
          <input
            type="text"
            className={firstNameError ? "input input-bordered input-error w-full border-2 rounded-lg pl-2" : inputOutlineClass}
            placeholder="First name"
            value={firstNameInput}
            onChange={(e) => {
              setFirstNameInput(e.target.value);
              if (firstNameError) setFirstNameError("");
            }}
            required
            aria-required="true"
            aria-invalid={!!firstNameError}
            aria-describedby={firstNameError ? "firstName-error" : undefined}
          />
          {firstNameError && <p id="firstName-error" className="text-sm text-error">{firstNameError}</p>}
        </label>
        <label className="form-control w-full gap-1">
          <span className="sr-only">Last name (required)</span>
          <input
            type="text"
            className={lastNameError ? "input input-bordered input-error w-full border-2 rounded-lg pl-2" : inputOutlineClass}
            placeholder="Last name"
            value={lastNameInput}
            onChange={(e) => {
              setLastNameInput(e.target.value);
              if (lastNameError) setLastNameError("");
            }}
            required
            aria-required="true"
            aria-invalid={!!lastNameError}
            aria-describedby={lastNameError ? "lastName-error" : undefined}
          />
          {lastNameError && <p id="lastName-error" className="text-sm text-error">{lastNameError}</p>}
        </label>
      </div>
      <label className="form-control w-full gap-1 pt-6">
        <span className="sr-only">Work email (required)</span>
        <input
          ref={emailInputRef}
          type="email"
          className={emailError ? "input input-bordered input-error w-full border-2 rounded-lg pl-2" : inputOutlineClass}
          placeholder="Work email"
          value={emailInput}
          onChange={(event) => {
            setEmailInput(event.target.value);
            if (emailError) setEmailError("");
          }}
          required
          aria-required="true"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && <p id="email-error" className="text-sm text-error">{emailError}</p>}
      </label>
      <label className="form-control w-full gap-1">
        <span className="sr-only">Website URL (required)</span>
        <input
          type="url"
          className={websiteUrlError ? "input input-bordered input-error w-full border-2 rounded-lg pl-2" : inputOutlineClass}
          placeholder="Website URL"
          value={websiteUrlInput}
          onChange={(e) => {
            setWebsiteUrlInput(e.target.value);
            if (websiteUrlError) setWebsiteUrlError("");
          }}
          required
          aria-required="true"
          aria-invalid={!!websiteUrlError}
          aria-describedby={websiteUrlError ? "website-url-error" : undefined}
        />
        {websiteUrlError && <p id="website-url-error" className="text-sm text-error">{websiteUrlError}</p>}
      </label>
      <div className="flex flex-col-reverse gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
        <button className="btn btn-primary" onClick={handleEmailSubmit} type="button">
          Show me my 7-Day plan
        </button>
        <button className="btn btn-ghost" onClick={handleBack} type="button">
          Back
        </button>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!safePlan?.days?.length) {
      return (
        <div className="space-y-4">
          <p className="text-base-content/80">Loading your plan...</p>
          <button type="button" className="btn btn-ghost" onClick={() => setCurrentStepIndex(QUESTIONS_START_STEP)}>
            Start over
          </button>
        </div>
      );
    }
    return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Your plan to capture missed opportunities</h1>
          <h2 className="text-2xl font-semibold">Your 7-day plan is ready</h2>
          <p className="text-base text-base-content/80">
            Based on your answers, here&apos;s the fastest place to capture missed opportunities this week.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={resetFlow} type="button">
          Start over
        </button>
      </div>

      <div className="space-y-2 text-sm text-base-content/80">
        <p>
          <span className="font-semibold text-base-content">Goal:</span> {getOptionLabel("q2Goal", answers.q2Goal)}
        </p>
        <p>
          <span className="font-semibold text-base-content">Where work piles up:</span>{" "}
          {getOptionLabel("q3Pileup", answers.q3Pileup)}
        </p>
        <p>
          <span className="font-semibold text-base-content">Where work starts:</span>{" "}
          {getOptionLabel("q4Start", answers.q4Start)}
        </p>
        <p>
          <span className="font-semibold text-base-content">Where opportunities are lost:</span>{" "}
          {getOptionLabel("q5Lost", answers.q5Lost)}
        </p>
        <p>
          <span className="font-semibold text-base-content">Role:</span>{" "}
          {getOptionLabel("q1Role", answers.q1Role)}
        </p>
      </div>

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body">
          <p className="text-sm text-base-content/60">Top opportunity</p>
          <h3 className="text-xl font-semibold">Recommended: {safePlan.name}</h3>
          <p className="text-base text-base-content/80">{safePlan.oneLiner}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Your 7-day plan</h3>
        <PlansDayGrid plan={safePlan} />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setShowEmailPreview((v) => !v)}
        >
          {showEmailPreview ? "Hide" : "Show"} email preview: How your 7-Day Plan would look in email
        </button>
        {showEmailPreview && (
          <div className="rounded-lg border border-base-300 bg-white p-6 text-base-content shadow-inner">
            <div className="font-sans text-sm" style={{ maxWidth: "600px" }}>
              <p className="text-xs text-base-content/60 mb-4">              Subject: Your FREE 7-Day Plan – {safePlan.name}</p>
              <h2 className="text-lg font-bold mb-1">{safePlan.name}</h2>
              <p className="mb-4">{safePlan.oneLiner}</p>
              <p className="text-xs text-base-content/60 mb-4">Here’s your 7-day plan. Each day has a short title, a summary, and 3 steps with copy-paste prompts.</p>
              {safePlan.days.map((d) => (
                <div key={d.day} className="mb-6">
                  <p className="font-bold">Day {d.day}: {d.title}</p>
                  <p className="mb-2">{d.summary}</p>
                  <ol className="list-decimal pl-5 space-y-3">
                    {d.steps.map((s) => (
                      <li key={s.id}>
                        <span className="font-medium">{s.label}</span>
                        <pre className="mt-1 whitespace-pre-line text-xs bg-base-200/50 p-2 rounded font-sans">{s.prompt}</pre>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
              <p className="text-xs text-base-content/60 mt-4">Need help building this? Book a 30-minute Fit Check. Weekdays, 10am to 6pm Eastern.</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Do-It-Yourself</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-3">
              <div className="text-sm text-base-content/80">
                <p>
                  <span className="font-semibold text-base-content">Time:</span> {safePlan.diyTime}
                </p>
                <p>
                  <span className="font-semibold text-base-content">Calendar:</span> {safePlan.diyCalendar}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">You will need:</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                  {safePlan.diyNeeds.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-3">
              <p className="text-sm font-semibold">DIY risk</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                {safePlan.diyRisks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Two ways to move forward</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-4">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">DIY starter kit</h4>
                <p className="text-sm text-base-content/80">
                  Copy-paste prompts and a simple setup you can do yourself.
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleKitRequest} disabled={!canEmailKit} type="button">
                Email me the DIY kit
              </button>
              {kitSent ? (
                <p className="text-sm text-success">Sent. Check your inbox.</p>
              ) : (
                <p className="text-xs text-base-content/70">You'll also get the booking link.</p>
              )}
              {!canEmailKit && <p className="text-xs text-base-content/70">Enter your email first to receive the kit.</p>}
              <div className="space-y-3">
                {safePlan.diyStarterKit.prompts.map((p) => (
                  <div key={p.title} className="rounded border border-base-300 bg-base-100 p-3">
                    <p className="text-xs font-semibold text-base-content/80 mb-1">{p.title}</p>
                    <pre className="whitespace-pre-line text-xs text-base-content/80 font-sans">
                      {p.prompt}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-4">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Done-for-you build</h4>
                <p className="text-sm text-base-content/80">
                  Get this installed for you in 7 business days, with approvals, alerts, and reporting built in.
                </p>
              </div>
              {calendlyUrl ? (
                <a className="btn btn-secondary" href={calendlyUrl} rel="noreferrer" target="_blank">
                  Book a 30-minute Fit Check
                </a>
              ) : (
                <button className="btn btn-secondary btn-disabled" type="button" disabled>
                  Book a 30-minute Fit Check
                </button>
              )}
              <p className="text-xs text-base-content/70">Weekdays, 10am to 6pm Eastern.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Have us build it for you</h3>
        <div className="card border border-base-300 bg-base-100">
          <div className="card-body gap-3">
            <p className="text-sm font-semibold text-base-content">{safePlan.buildOutput.title}</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
              {safePlan.buildOutput.bullets
                .filter((item): item is string => typeof item === "string")
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
            {safePlan.buildOutput.bullets.map((item) =>
              typeof item === "object" && "sub" in item ? (
                <div key={item.label}>
                  <p className="text-sm font-semibold text-base-content mt-2">{item.label}</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                    {item.sub.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">What happens on the call</h3>
        {answers.q1Role === "enterprise-vp" ? (
          <ol className="list-decimal space-y-2 pl-5 text-sm text-base-content/80">
            <li>Pick one pilot process for one team.</li>
            <li>Confirm access, approvals, risk constraints.</li>
            <li>Confirm what &quot;done&quot; looks like in 7 business days.</li>
            <li>Leave with a fixed-scope pilot proposal.</li>
          </ol>
        ) : (
          <ol className="list-decimal space-y-2 pl-5 text-sm text-base-content/80">
            <li>Pick one process to implement first.</li>
            <li>Confirm triggers, rules, owners, edge cases.</li>
            <li>Confirm what &quot;done&quot; looks like in 7 business days.</li>
            <li>Leave with a fixed-scope build proposal.</li>
          </ol>
        )}
      </div>

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body items-start gap-4">
          <h3 className="text-xl font-semibold">Book a 30-minute Fit Check</h3>
          {calendlyUrl ? (
            <a className="btn btn-primary" href={calendlyUrl} rel="noreferrer" target="_blank">
              Book a 30-minute Fit Check
            </a>
          ) : (
            <button className="btn btn-primary btn-disabled" type="button" disabled>
              Book a 30-minute Fit Check
            </button>
          )}
          <p className="text-xs text-base-content/70">Weekdays, 10am to 6pm Eastern.</p>
        </div>
      </div>
    </div>
  );
  };

  return (
    <div className={`bg-base-100 px-4 py-10 ${inModal ? "min-h-0" : "min-h-screen"}`}>
      <form name="lead-magnet" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="lead-magnet" />
        <input type="hidden" name="subject" value="7-Day Plan" />
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        <input type="text" name="event_type" />
        <input type="text" name="first_name" />
        <input type="text" name="last_name" />
        <input type="url" name="website_url" />
        <input type="email" name="email" />
        <input type="text" name="q1" />
        <input type="text" name="q2" />
        <input type="text" name="q3" />
        <input type="text" name="q4" />
        <input type="text" name="q5" />
        <input type="text" name="plan_key" />
        <input type="text" name="plan_name" />
        <input type="text" name="pagePath" />
        <input type="text" name="utm_source" />
        <input type="text" name="utm_medium" />
        <input type="text" name="utm_campaign" />
        <input type="text" name="utm_content" />
        <input type="text" name="utm_term" />
        <input type="text" name="createdAt" />
      </form>
      <div className="mx-auto w-full max-w-[680px]">
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body gap-6">
            <div className="text-center space-y-1 pb-2 border-b border-base-300" data-lead-magnet-version="v4">
              <p className="text-2xl uppercase tracking-wide font-medium" style={{ color: "#C6513A" }}>
                Increase revenue without increasing costs
              </p>
              <p className="text-3xl font-bold text-base-content">
                Answer 5 questions. Get a FREE 7-Day Plan.
              </p>
            </div>
            {isQuestionStep && renderQuestion()}
            {currentStepIndex === EMAIL_STEP && renderEmailGate()}
            {currentStepIndex === RESULTS_STEP && renderResults()}
          </div>
        </div>
      </div>
    </div>
  );
}
