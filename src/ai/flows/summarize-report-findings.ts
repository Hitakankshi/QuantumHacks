'use server';
/**
 * @fileOverview Provides an AI-powered summary of key findings in a diagnostic report.
 *
 * - summarizeReportFindings - A function that generates a summary of the report findings.
 * - SummarizeReportFindingsInput - The input type for the summarizeReportFindings function.
 * - SummarizeReportFindingsOutput - The return type for the summarizeReportFindings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReportFindingsInputSchema = z.object({
  reportText: z.string().describe('The full text of the diagnostic report.'),
});
export type SummarizeReportFindingsInput = z.infer<typeof SummarizeReportFindingsInputSchema>;

const SummarizeReportFindingsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key findings in the report.'),
});
export type SummarizeReportFindingsOutput = z.infer<typeof SummarizeReportFindingsOutputSchema>;

export async function summarizeReportFindings(input: SummarizeReportFindingsInput): Promise<SummarizeReportFindingsOutput> {
  return summarizeReportFindingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReportFindingsPrompt',
  input: {schema: SummarizeReportFindingsInputSchema},
  output: {schema: SummarizeReportFindingsOutputSchema},
  prompt: `Summarize the key findings of the following website diagnostic report. Focus on the most critical issues and their potential impact. Be concise and clear.

Report:
{{{reportText}}}`,
});

const summarizeReportFindingsFlow = ai.defineFlow(
  {
    name: 'summarizeReportFindingsFlow',
    inputSchema: SummarizeReportFindingsInputSchema,
    outputSchema: SummarizeReportFindingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
