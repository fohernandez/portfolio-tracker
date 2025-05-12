import.meta.env.VITE_ALPHA_VANTAGE_API_KEY

export const API_CONFIG = {
  alphaVantage: {
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
  }
};
