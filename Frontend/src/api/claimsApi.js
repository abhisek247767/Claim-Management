import API_BASE_URL from "./core";

// Submit a claim
export const submitClaim = async (claimData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit claim");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error submitting claim:", error);
      throw error;
    }
  };

// Fetch all claims
export const getClaims = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/claims`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching claims:", error);
    throw error;
  }
};
