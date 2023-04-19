export const formatCurrency = (
  value: number,
  decimal = 2,
  currency = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimal,
  }).format(value);
};
