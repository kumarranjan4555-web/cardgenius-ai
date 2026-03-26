import { GoogleGenAI, Type } from "@google/genai";
import { CREDIT_CARDS } from "../constants";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export async function getRecommendedCards(income: number, spending: any, city: string) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Based on the following user profile, recommend the top 3 credit cards from the provided list.
    User Income: ₹${income} per month
    User Spending: ${JSON.stringify(spending)}
    User City: ${city}
    
    Available Cards:
    ${JSON.stringify(CREDIT_CARDS.map(c => ({ id: c.id, name: c.name, bank: c.bank, benefits: c.benefits })))}
    
    Return the result as a JSON array of card IDs.
  `;

  try {
    const apiCall = ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    // Enforce 1.5s max loading time
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 1500)
    );

    const response = await Promise.race([apiCall, timeoutPromise]) as any;

    const cardIds = JSON.parse(response.text || "[]");
    const recommended = CREDIT_CARDS.filter(card => cardIds.includes(card.id)).slice(0, 3);
    
    // If AI didn't return enough cards, fallback
    if (recommended.length === 0) throw new Error('No cards returned from AI');
    
    return recommended;
  } catch (error) {
    console.error("Gemini AI Error or Timeout:", error);
    // Fallback to simple logic if AI fails or times out
    return CREDIT_CARDS.filter(card => card.minIncome <= income).slice(0, 3);
  }
}
