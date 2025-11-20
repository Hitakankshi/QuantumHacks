'use server';
/**
 * @fileOverview AI-powered actionable solutions generator for website issues.
 *
 * - generateActionableSolutions - A function that generates actionable solutions for website issues.
 * - GenerateActionableSolutionsInput - The input type for the generateActionableSolutions function.
 * - GenerateActionableSolutionsOutput - The return type for the generateActionableSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActionableSolutionsInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A description of the website issue identified.'),
  possibleSolutions: z.array(z.string()).describe('The possible solutions to resolve the issue.'),
});
export type GenerateActionableSolutionsInput = z.infer<
  typeof GenerateActionableSolutionsInputSchema
>;

const GenerateActionableSolutionsOutputSchema = z.object({
  actionableSolution: z
    .string()
    .describe('The chosen, actionable solution to resolve the website issue.'),
});
export type GenerateActionableSolutionsOutput = z.infer<
  typeof GenerateActionableSolutionsOutputSchema
>;

export async function generateActionableSolutions(
  input: GenerateActionableSolutionsInput
): Promise<GenerateActionableSolutionsOutput> {
  return generateActionableSolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActionableSolutionsPrompt',
  input: {schema: GenerateActionableSolutionsInputSchema},
  output: {schema: GenerateActionableSolutionsOutputSchema},
  prompt: `You are an AI expert in website diagnostics and solutions.

  Given a description of a website issue and a list of possible solutions,
  choose the best solution and provide a clear, step-by-step guide to implement it.

  Issue Description: {{{issueDescription}}}
  Possible Solutions: {{#each possibleSolutions}}{{{this}}}\n{{/each}}
  \n  Provide the best actionable solution.
  `,
});

const generateActionableSolutionsFlow = ai.defineFlow(
  {
    name: 'generateActionableSolutionsFlow',
    inputSchema: GenerateActionableSolutionsInputSchema,
    outputSchema: GenerateActionableSolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
