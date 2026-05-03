import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let ai = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Fallback candidates
const FALLBACK_CANDIDATES = [
  { name: 'Arjun Rao', party: 'The Solar Front', symbol: '☀️' },
  { name: 'Kabir Das', party: 'The Lunar Alliance', symbol: '🌙' },
  { name: 'Priya Singh', party: 'The Nebula Coalition', symbol: '☁️' }
];

export const generateCandidates = async (constituency) => {
  if (!ai) {
    console.warn("Gemini API key missing, using fallback candidates.");
    const fallbackWithNota = [...FALLBACK_CANDIDATES, { name: 'NOTA', party: 'None of the Above', symbol: '🗳️' }];
    return fallbackWithNota.sort((a, b) => a.name.localeCompare(b.name));
  }

  try {
    const prompt = `Generate a JSON array of exactly 3 realistic but entirely fictional and politically neutral election candidates for the Indian constituency of ${constituency}. 
Each candidate must have:
- "name": A generic Indian name.
- "party": A generic, fictional party name (e.g., "The Unity Bloc").
- "symbol": A single emoji representing their party symbol (e.g., "⭐", "🌳").

Return ONLY a valid JSON array.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const candidatesText = response.text;
    let candidates = JSON.parse(candidatesText);
    
    candidates.push({ name: 'NOTA', party: 'None of the Above', symbol: '🗳️' });
    
    return candidates.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to generate candidates from Gemini:", error);
    const fallbackWithNota = [...FALLBACK_CANDIDATES, { name: 'NOTA', party: 'None of the Above', symbol: '🗳️' }];
    return fallbackWithNota.sort((a, b) => a.name.localeCompare(b.name));
  }
};
