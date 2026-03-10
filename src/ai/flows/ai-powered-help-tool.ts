'use server';
/**
 * @fileOverview An AI-powered help tool for InSync IT, providing instant answers to questions about services,
 * general IT advice, and troubleshooting common issues.
 *
 * - aiPoweredHelpTool - A function that handles answering user questions.
 * - AiPoweredHelpToolInput - The input type for the aiPoweredHelpTool function.
 * - AiPoweredHelpToolOutput - The return type for the aiPoweredHelpTool function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPoweredHelpToolInputSchema = z.object({
  question: z.string().describe('The user\'s question about InSync IT services, general IT advice, or troubleshooting.'),
});
export type AiPoweredHelpToolInput = z.infer<typeof AiPoweredHelpToolInputSchema>;

const AiPoweredHelpToolOutputSchema = z.object({
  answer: z.string().describe('The AI\'s comprehensive answer to the user\'s question.'),
});
export type AiPoweredHelpToolOutput = z.infer<typeof AiPoweredHelpToolOutputSchema>;

export async function aiPoweredHelpTool(input: AiPoweredHelpToolInput): Promise<AiPoweredHelpToolOutput> {
  return aiPoweredHelpToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredHelpToolPrompt',
  input: { schema: AiPoweredHelpToolInputSchema },
  output: { schema: AiPoweredHelpToolOutputSchema },
  prompt: `You are InSync IT's AI-powered help tool, designed to provide instant and accurate answers to customer questions.
Your role is to assist users with:
-   Information about InSync IT's services.
-   General IT advice.
-   Troubleshooting common technical issues.

Be helpful, clear, concise, and professional. Do not invent information about InSync IT if it's outside your training data; instead, suggest contacting support if you cannot provide a definitive answer.

User Question: {{{question}}}

Answer:`,
});

const aiPoweredHelpToolFlow = ai.defineFlow(
  {
    name: 'aiPoweredHelpToolFlow',
    inputSchema: AiPoweredHelpToolInputSchema,
    outputSchema: AiPoweredHelpToolOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
