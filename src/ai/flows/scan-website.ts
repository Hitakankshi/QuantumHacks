'use server';
/**
 * @fileOverview An AI flow to scan a website and generate a diagnostic report.
 *
 * - scanWebsite - A function that takes a URL and returns a comprehensive website report.
 * - ScanWebsiteInput - The input type for the scanWebsite function.
 * - ScanWebsiteOutput - The return type for the scanWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScanWebsiteInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to be scanned.'),
});
export type ScanWebsiteInput = z.infer<typeof ScanWebsiteInputSchema>;

const IssueSchema = z.object({
  id: z.string().describe('A unique identifier for the issue (e.g., perf-1).'),
  category: z
    .enum(['Performance', 'SEO', 'Security', 'Accessibility'])
    .describe('The category of the issue.'),
  severity: z
    .enum(['Critical', 'High', 'Medium', 'Low'])
    .describe('The severity of the issue.'),
  title: z.string().describe('A concise title for the issue.'),
  description: z
    .string()
    .describe('A detailed description of the issue found.'),
  possibleSolutions: z
    .array(z.string())
    .describe(
      'A list of potential solutions or next steps to resolve the issue.'
    ),
});

const ScanWebsiteOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "An overall site score from 0-100, based on the number and severity of issues found. 100 is a perfect score."
    ),
  reportSummary: z
    .string()
    .describe('A brief, one or two paragraph summary of the key findings.'),
  issues: z
    .array(IssueSchema)
    .describe('A list of all the issues identified during the scan.'),
});
export type ScanWebsiteOutput = z.infer<typeof ScanWebsiteOutputSchema>;

export async function scanWebsite(
  input: ScanWebsiteInput
): Promise<ScanWebsiteOutput> {
  return scanWebsiteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanWebsitePrompt',
  input: { schema: ScanWebsiteInputSchema },
  output: { schema: ScanWebsiteOutputSchema },
  prompt: `You are an expert website diagnostician. Your task is to perform a comprehensive scan of the website at the given URL: {{{url}}}.

  Analyze the website for common issues across the following categories:
  - **Performance**: Check for issues like slow server response time (TTFB), large image sizes, render-blocking resources (CSS/JS), and improper caching.
  - **SEO**: Look for problems such as missing meta descriptions, broken links, duplicate content, and poor keyword optimization.
  - **Security**: Identify vulnerabilities like missing security headers (e.g., Content Security Policy), insecure forms, and mixed content warnings.
  - **Accessibility**: Find issues that make the site difficult to use for people with disabilities, such as missing image alt text, low contrast text, and non-navigable elements.

  Based on your findings, you must:
  1.  Generate a list of all identified issues. For each issue, provide a unique ID, a clear title, a detailed description, its category, its severity (Critical, High, Medium, or Low), and a list of 2-4 possible solutions.
  2.  Calculate an overall site score from 0 to 100. A higher score means a healthier site. A score of 100 means no issues were found. The score should decrease based on the number and severity of the issues (e.g., a Critical issue should lower the score more than a Low severity issue).
  3.  Write a one or two-paragraph summary of your most important findings.

  Return the results strictly in the specified JSON format.`,
});

const scanWebsiteFlow = ai.defineFlow(
  {
    name: 'scanWebsiteFlow',
    inputSchema: ScanWebsiteInputSchema,
    outputSchema: ScanWebsiteOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
