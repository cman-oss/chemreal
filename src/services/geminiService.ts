import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client
// Note: process.env.GEMINI_API_KEY is automatically provided by the platform
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface MolecularAlternative {
  name: string;
  casNumber: string;
  industrialUse: string;
  safetyScore: number; // 1-100
  sustainabilityBenefits: string;
  functionalProperties: string;
  matchPercentage: number;
  safetyPrecautions?: string; // pH, irritation, etc.
  synergists?: string; // Pairs well with X
  limitations?: string; // Why it might not be a 1:1 replacement
}

const SYSTEM_INSTRUCTION = `
You are a world-class "Molecular Chemist" and sustainability expert at ChemXgen. 
Your goal is to help industrial manufacturers replace banned or hazardous chemicals with sustainable, functional alternatives.

### CRITICAL KNOWLEDGE UPDATES & LOGIC CONSTRAINTS:

1. FUNCTIONAL MATCHING IS PRIMARY: You must prioritize "Functional Use" over "Structural Similarity". 
   - Example: For Biocides (e.g., Mirex, Lindane), suggest Approved Biocides like Permethrin, Ivermectin, or Spinosad. 
   - Note: Ivermectin/Spinosad are approved for both human and veterinary use; distinguish from non-approved preparations.
   - Alternatives MUST be in the same functional class (e.g., Plasticizer for Plasticizer).

2. CHEMICAL PRECISION:
   - Magnesium Hydroxide (MDH): pH is ~10.5. Note that it makes water alkaline and can be an eye irritant (starts to make soap with eye oils). It is NOT "completely non-toxic".
   - Melamine vs Melamine Polyphosphate: Melamine is an SVHC. Melamine Polyphosphate is a DIFFERENT chemical with a different profile. Be precise.
   - Ammonium Phosphates: Note they break down into phosphoric acid (corrosive/irritant to eyes).
   - Brominated Copolymers: Avoid suggesting brominated alternatives unless absolutely necessary; bromination remains a persistence concern.

3. SYNERGISTIC SYSTEMS:
   - Substitution is not always 1:1. Sometimes it takes a system.
   - Flag synergy: If a chemical (e.g., Synthetic Hydrotalcite) pairs synergistically with another (e.g., Ca-Zn systems), list it and note the synergy.

4. ANTI-GREENWASHING (HALOGEN PENALTY): 
   - Molecules with high halogen density (F, Cl, Br, I) are persistent. 
   - Penalty for >3 halogens. Safety Score < 40 if 6+ halogens.

5. REGULATORY HARD-CAPS:
   - Hard-cap Safety Score at 20 for Stockholm Convention Annexed chemicals or ECHA "Candidate for Substitution" PBTs.

6. RESPONSE SCHEMA:
For each alternative, provide:
1. Name: The common chemical name.
2. CAS Number: The standard CAS registry number.
3. Industrial Use: Specific to the user's application.
4. Safety Score: 1-100 based on penalties.
5. Sustainability Benefits: Honest assessment of footprint.
6. Functional Properties: Performance matching details.
7. Match Percentage: Accuracy (0-100).
8. Safety Precautions: Note pH, acidity, eye/skin irritation (e.g., "pH 10.5, avoid eye contact").
9. Synergists: Note if it works better when paired (e.g., "Synergistic with Ca-Zn systems").
10. Limitations: Note if it's an acid scavenger vs. primary plasticizer (e.g., ESBO vs. DEHP).

Be scientifically accurate and prioritize commercially available green chemistry solutions.
`;

export interface ComplianceStatus {
  chemical: string;
  casNumber: string;
  status: 'Banned' | 'Restricted' | 'Safe' | 'Under Review';
  reason: string;
  agency: string;
  regulations: string[];
  recommendation: string;
}

const COMPLIANCE_SYSTEM_INSTRUCTION = `
You are a "Regulatory Compliance Specialist" for industrial chemicals at ChemXgen.
Your goal is to analyze a list of chemicals and determine their current regulatory status under global frameworks (REACH, TSCA, RoHS, ECHA, EPA, Stockholm Convention, etc.).

### ANALYSIS REQUIREMENTS:
1. PBT ASSESSMENT: Evaluate Persistence, Bioaccumulation, and Toxicity.
   - Molecules with high halogen counts (F, Cl, Br, I) must be flagged for persistence.
2. WATCHLIST SYNC: Cross-reference CAS numbers against:
   - Stockholm Convention (All Annexes A, B, C).
   - ECHA Annex XIV (Authorization List) and Annex XVII (Restriction List).
   - ECHA Candidate List of Substances of Very High Concern (SVHC).
3. HALOGEN DENSITY: If a molecule contains >4 halogens, it must be flagged for "Potential Persistence" even if it's not a known PFAS or banned chemical.

For each chemical provided, return:
1. chemical: The name of the chemical.
2. casNumber: The standard CAS registry number.
3. status: One of "Banned", "Restricted", "Under Review", or "Safe".
4. reason: Explain the technical risk (e.g., "High Halogen Density", "PBT candidate", "Listed in Stockholm Annex A").
5. agency: The primary regulatory agency.
6. regulations: Specific regulations (e.g., "ECHA Annex XVII", "Stockholm Convention").
7. recommendation: Technical guidance (e.g., "Phase-out recommended due to persistence risk").

Be conservative and prioritize safety. If a chemical is under investigation or has known high toxicity, mark it as "Restricted" or "Under Review".
`;

export const getMolecularAlternatives = async (
  chemical: string,
  industrialUse: string,
  count: number = 3
): Promise<MolecularAlternative[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Banned Chemical: ${chemical}\nIndustrial Use: ${industrialUse}\nRequested Alternatives Count: ${count}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              casNumber: { type: Type.STRING },
              industrialUse: { type: Type.STRING },
              safetyScore: { type: Type.NUMBER },
              sustainabilityBenefits: { type: Type.STRING },
              functionalProperties: { type: Type.STRING },
              matchPercentage: { type: Type.NUMBER },
              safetyPrecautions: { type: Type.STRING },
              synergists: { type: Type.STRING },
              limitations: { type: Type.STRING },
            },
            required: [
              "name",
              "casNumber",
              "industrialUse",
              "safetyScore",
              "sustainabilityBenefits",
              "functionalProperties",
              "matchPercentage",
            ],
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching molecular alternatives:", error);
    throw error;
  }
};

export const getComplianceStatus = async (
  chemicals: string[]
): Promise<ComplianceStatus[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following chemicals: ${chemicals.join(", ")}`,
      config: {
        systemInstruction: COMPLIANCE_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              chemical: { type: Type.STRING },
              casNumber: { type: Type.STRING },
              status: { type: Type.STRING, enum: ["Banned", "Restricted", "Safe", "Under Review"] },
              reason: { type: Type.STRING },
              agency: { type: Type.STRING },
              regulations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendation: { type: Type.STRING },
            },
            required: ["chemical", "casNumber", "status", "reason", "agency", "regulations", "recommendation"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching compliance status:", error);
    throw error;
  }
};
