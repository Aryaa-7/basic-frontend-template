// API Configuration
export const API_CONFIG = {
  EXPRESS: 'http://localhost:3001/api',
  PYTHON: 'http://localhost:5000/api',
};

// Change this to switch backends easily!
export const CURRENT_API = API_CONFIG.EXPRESS;

// API call function
export const generateResponse = async (prompt) => {
  const response = await fetch(`${CURRENT_API}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return await response.json();
};