// Currency formatting utilities for Iraqi Dinar (IQD)

/**
 * Format amount as Iraqi Dinar currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatIQD = (
  amount: number, 
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  } = {}
): string => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    showSymbol = true
  } = options;

  try {
    // Try using Intl.NumberFormat with IQD
    const formatter = new Intl.NumberFormat('ar-IQ', {
      style: 'currency',
      currency: 'IQD',
      minimumFractionDigits,
      maximumFractionDigits,
    });
    return formatter.format(amount);
  } catch (error) {
    // Fallback formatting if IQD is not supported
    const formattedNumber = amount.toLocaleString('ar-IQ', {
      minimumFractionDigits,
      maximumFractionDigits,
    });
    return showSymbol ? `${formattedNumber} د.ع` : formattedNumber;
  }
};

/**
 * Format amount as Iraqi Dinar with fallback
 * @param amount - The amount to format
 * @returns Formatted currency string with د.ع symbol
 */
export const formatIQDFallback = (amount: number): string => {
  return `${amount.toLocaleString('ar-IQ')} د.ع`;
};

/**
 * Format amount for display in tables and cards
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatIQDDisplay = (amount: number): string => {
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return `${millions.toFixed(1)} مليون د.ع`;
  } else if (amount >= 1000) {
    const thousands = amount / 1000;
    return `${thousands.toFixed(0)} ألف د.ع`;
  } else {
    return formatIQDFallback(amount);
  }
};

/**
 * Parse currency string back to number
 * @param currencyString - The currency string to parse
 * @returns Parsed number or 0 if invalid
 */
export const parseIQD = (currencyString: string): number => {
  // Remove currency symbols and Arabic text
  const cleanString = currencyString
    .replace(/د\.ع/g, '')
    .replace(/مليون/g, '')
    .replace(/ألف/g, '')
    .replace(/[^\d.,]/g, '')
    .trim();
  
  const number = parseFloat(cleanString.replace(/,/g, ''));
  return isNaN(number) ? 0 : number;
};

/**
 * Get color class based on debt amount
 * @param amount - The debt amount
 * @returns CSS color class
 */
export const getDebtColorClass = (amount: number): string => {
  if (amount > 10000000) return 'text-destructive'; // Over 10M IQD
  if (amount > 5000000) return 'text-warning';      // Over 5M IQD
  if (amount > 1000000) return 'text-primary';      // Over 1M IQD
  return 'text-success';                             // Under 1M IQD
};

/**
 * Get badge variant based on debt amount
 * @param amount - The debt amount
 * @returns Badge variant
 */
export const getDebtBadgeVariant = (amount: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (amount > 10000000) return 'destructive';
  if (amount > 5000000) return 'secondary';
  return 'default';
};