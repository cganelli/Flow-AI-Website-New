/**
 * Helpers for building recipe-style step prompts (v3).
 * Use for consistent structure: goal, what to paste, example, prompt, how to use, done checklist.
 */

export function exampleBlock(
  type: "roofing" | "accounting" | "generic",
  content: string
): string {
  if (type === "generic") return `Example input:\n${content}`;
  return `Example input (${type}):\n${content}`;
}

export type RecipeParams = {
  title: string;
  goal: string;
  whatToPaste: string;
  exampleType: "roofing" | "accounting" | "generic";
  exampleContent: string;
  copyPastePrompt: string;
  howToUse: string;
  doneChecklist: string;
};

export function recipeBlock(params: RecipeParams): string {
  const examplePart = exampleBlock(params.exampleType, params.exampleContent);
  return `Title: ${params.title}
Goal: ${params.goal}
What you will paste: ${params.whatToPaste}
${examplePart}
Copy and paste prompt:
${params.copyPastePrompt}
How to use:
${params.howToUse}
Done checklist:
${params.doneChecklist}`;
}
