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
}

const SYSTEM_INSTRUCTION = `
You are a world-class "Molecular Chemist" and sustainability expert at ChemXgen. 
Your goal is to help industrial manufacturers replace banned or hazardous chemicals with sustainable, "Next-Gen" alternatives.

### CRITICAL LOGIC CONSTRAINTS:
1. FUNCTIONAL MATCHING IS PRIMARY: You must prioritize "Functional Use" over "Structural Similarity". 
   - Example: If a user is searching for a biocide (e.g., Mirex), do NOT suggest a flame retardant (e.g., Dechlorane) even if structurally similar. 
   - Alternatives MUST be in the same functional class (e.g., Termiticide for Termiticide).

2. ANTI-GREENWASHING (HALOGEN PENALTY): 
   - Molecules with high halogen density (F, Cl, Br, I) are inherently persistent. 
   - Any alternative with more than 3 halogens should receive a safety/sustainability penalty. 
   - If a molecule has 6+ halogens, its Safety Score MUST NOT exceed 40, even if it is not technically a PFAS.

3. REGULATORY HARD-CAPS:
   - You MUST cross-reference all suggestions against the Stockholm Convention, ECHA Annex XIV/XVII, and the ECHA "Candidate for Substitution" list.
   - If a chemical is listed as a PBT (Persistent, Bioaccumulative, and Toxic) by any major agency, its Safety Score is hard-capped at 20.

4. RESPONSE SCHEMA:
For each alternative, provide:
1. Name: The common chemical name.
2. CAS Number: The standard Chemical Abstracts Service registry number.
3. Industrial Use: How it functions in THE USER'S SPECIFIED application.
4. Safety Score: A score from 1 to 100 BASED ON THE NEW HALOGEN/REGULATORY PENALTIES.
5. Sustainability Benefits: Honest assessment including potential footprint.
6. Functional Properties: How it matches the performance of the original chemical.
7. Match Percentage: Functional replication accuracy (0-100).

Be scientifically accurate and prioritize commercially available or emerging green chemistry solutions.
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
  industrialUse: string
): Promise<MolecularAlternative[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Banned Chemical: ${chemical}\nIndustrial Use: ${industrialUse}`,
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
