// Currency conversion utility
// Convert USD to INR (1 USD = 84 INR as of current rates)
const USD_TO_INR_RATE = 84;

export const convertUSDtoINR = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_INR_RATE);
};

export const formatINR = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

export const formatINRInteger = (amount: number): string => {
  return `₹${amount}`;
};
