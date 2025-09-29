/**
 * Formats a number as Indian Rupee currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₹1,23,456")
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Formats a number as Indian Rupee currency without the symbol
 * @param amount - The amount to format
 * @returns Formatted number string (e.g., "1,23,456")
 */
export function formatINRNumber(amount: number): string {
  return amount.toLocaleString('en-IN');
}
