// Purpose: Client-side lead magnet quiz wizard with persistence and results display. Location: src/components/LeadMagnetWizard.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { buildCalendlyUrl, getOptionLabel, getPlan, getPlanKeyFromQ3 } from "../app/lead-magnet/logic";
import { questions } from "../app/lead-magnet/questions";
import type { LeadAnswers } from "../app/lead-magnet/logic";

const STORAGE_KEY = "flowai_leadmagnet_v1";

const INTRO_STEP = 0;
const QUESTIONS_START_STEP = 1;
const QUESTIONS_END_STEP = 5;
const EMAIL_STEP = 6;
const RESULTS_STEP = 7;

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
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LeadMagnetWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(INTRO_STEP);
  const [answers, setAnswers] = useState<LeadAnswers>(defaultAnswers);
  const [email, setEmail] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [kitSent, setKitSent] = useState(false);
  const [utm, setUtm] = useState<UTMParams>({});
  const hasHydrated = useRef(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const planKey = getPlanKeyFromQ3(answers.q3Pileup);
  const plan = getPlan(planKey);
  const calendlyBaseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
  const calendlyUrl = buildCalendlyUrl(calendlyBaseUrl, email, answers, plan);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<StoredState>;
        if (typeof parsed.currentStepIndex === "number") {
          setCurrentStepIndex(parsed.currentStepIndex);
        }
        if (parsed.answers) {
          setAnswers({ ...defaultAnswers, ...parsed.answers });
        }
        if (parsed.email) {
          setEmail(parsed.email);
          setEmailInput(parsed.email);
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
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [currentStepIndex, answers, email]);

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
  const canMoveNext = Boolean(selectedValue);
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
    setCurrentStepIndex((prev) => Math.max(prev - 1, INTRO_STEP));
  };

  const resetFlow = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setCurrentStepIndex(INTRO_STEP);
    setAnswers(defaultAnswers);
    setEmail("");
    setEmailInput("");
    setEmailError("");
    setKitSent(false);
  };

  const submitLead = async (eventType: LeadEventType, emailOverride?: string) => {
    const payload = {
      event_type: eventType,
      email: emailOverride ?? email,
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
      utm,
    };
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (error) {
      console.error("Lead submit failed:", error);
    }
  };

  const handleEmailSubmit = async () => {
    setEmailError("");
    if (!isValidEmail(emailInput)) {
      setEmailError("Enter a valid work email.");
      return;
    }
    const nextEmail = emailInput.trim();
    setEmail(nextEmail);
    await submitLead("lead_captured", nextEmail);
    setCurrentStepIndex(RESULTS_STEP);
  };

  const handleKitRequest = async () => {
    if (!canEmailKit || kitSent) {
      return;
    }
    await submitLead("kit_requested");
    setKitSent(true);
  };

  const renderIntro = () => (
    <div className="space-y-5 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Increase revenue without increasing costs</h1>
        <p className="text-base text-base-content/80">
          Answer 5 questions. Get a 7-day plan to capture missed opportunities this week.
        </p>
      </div>
      <button className="btn btn-primary btn-lg w-full" onClick={handleNext} type="button">
        Get my plan
      </button>
      <p className="text-sm text-base-content/70">5 questions, under 60 seconds</p>
    </div>
  );

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
                className={`btn btn-lg w-full justify-start text-left ${
                  isSelected ? "btn-primary" : "btn-outline"
                }`}
                aria-pressed={isSelected}
                onClick={() => updateAnswer(question.id, option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {questionIndex + 1 >= 2 && (
              <button className="btn btn-ghost" onClick={handleBack} type="button">
                Back
              </button>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleNext} disabled={!canMoveNext} type="button">
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderEmailGate = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Your plan is ready</h2>
        <p className="text-base text-base-content/80">
          Enter your email to unlock your 7-day plan and the booking link for your 30-minute Automation Audit + Build
          Plan.
        </p>
      </div>
      <label className="form-control w-full gap-2">
        <span className="label-text">Work email</span>
        <input
          ref={emailInputRef}
          type="email"
          className="input input-bordered w-full"
          placeholder="you@company.com"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
        />
      </label>
      {emailError && <p className="text-sm text-error">{emailError}</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className="btn btn-ghost" onClick={handleBack} type="button">
          Back
        </button>
        <button className="btn btn-primary" onClick={handleEmailSubmit} type="button">
          Send my plan and show results
        </button>
      </div>
      <p className="text-sm text-base-content/70">One email with your plan.</p>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Your plan to capture missed opportunities</h1>
          <h2 className="text-2xl font-semibold">Your 7-day plan is ready</h2>
          <p className="text-base text-base-content/80">
            Based on your answers, here is the fastest place to capture missed opportunities this week.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={resetFlow} type="button">
          Start over
        </button>
      </div>

      <div className="space-y-2 text-sm text-base-content/80">
        <p>
          <span className="font-semibold text-base-content">Role:</span>{" "}
          {getOptionLabel("q1Role", answers.q1Role)}
        </p>
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
      </div>

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body">
          <p className="text-sm text-base-content/60">Top opportunity</p>
          <h3 className="text-xl font-semibold">Recommended: {plan.name}</h3>
          <p className="text-base text-base-content/80">
            <span className="font-semibold text-base-content">One-liner:</span> {plan.oneLiner}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">7-day plan</h3>
        <div className="grid gap-3">
          {plan.planDays.map((day) => (
            <div key={day.label} className="card border border-base-300 bg-base-100">
              <div className="card-body py-4">
                <p className="text-sm font-semibold">{day.label}</p>
                <p className="text-sm text-base-content/80">{day.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Do-It-Yourself</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-3">
              <div className="text-sm text-base-content/80">
                <p>
                  <span className="font-semibold text-base-content">Time:</span> {plan.diy.time}
                </p>
                <p>
                  <span className="font-semibold text-base-content">Calendar:</span> {plan.diy.calendar}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">You will need:</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                  {plan.diy.youNeed.map((item) => (
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
                {plan.diy.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card border border-base-300 bg-base-100">
          <div className="card-body gap-3">
            <p className="text-sm font-semibold">Steps</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-base-content/80">
              {plan.diy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
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
              <ul className="list-disc space-y-1 pl-4 text-xs text-base-content/70">
                {plan.diy.promptTemplates.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
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
        <h3 className="text-xl font-semibold">Have Flow AI build it for you</h3>
        <div className="card border border-base-300 bg-base-100">
          <div className="card-body gap-3">
            <p className="text-sm font-semibold">Implementation output</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
              {plan.build.outputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm font-semibold">Quality assurance</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
              {plan.build.qualityAssurance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">What happens on the call</h3>
        {answers.q1Role === "enterprise-vp" ? (
          <ol className="list-decimal space-y-2 pl-5 text-sm text-base-content/80" start={5}>
            <li>Pick one pilot process for one team.</li>
            <li>Confirm access, approvals, risk constraints.</li>
            <li>Confirm what "done" looks like in 7 business days.</li>
            <li>Leave with a fixed-scope pilot proposal.</li>
          </ol>
        ) : (
          <ol className="list-decimal space-y-2 pl-5 text-sm text-base-content/80">
            <li>Pick one process to implement first.</li>
            <li>Confirm triggers, rules, owners, edge cases.</li>
            <li>Confirm what "done" looks like in 7 business days.</li>
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

  return (
    <div className="min-h-screen bg-base-100 px-4 py-10">
      <div className="mx-auto w-full max-w-[680px]">
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body gap-6">
            {currentStepIndex === INTRO_STEP && renderIntro()}
            {isQuestionStep && renderQuestion()}
            {currentStepIndex === EMAIL_STEP && renderEmailGate()}
            {currentStepIndex === RESULTS_STEP && renderResults()}
          </div>
        </div>
      </div>
    </div>
  );
}
