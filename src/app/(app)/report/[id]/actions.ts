'use server';

import { generateActionableSolutions } from '@/ai/flows/generate-actionable-solutions';
import type { Issue } from '@/lib/types';

export async function getSolution(issue: Issue) {
  try {
    const result = await generateActionableSolutions({
      issueDescription: `${issue.title}: ${issue.description}`,
      possibleSolutions: issue.possibleSolutions,
    });
    return result;
  } catch (error) {
    console.error('Error generating solution:', error);
    return {
      actionableSolution: 'An error occurred while generating a solution. Please try again later.',
    };
  }
}
