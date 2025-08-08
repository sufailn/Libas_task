export const AED_FORMATTER = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 2,
})

export function formatCurrency(amount: number) {
  return AED_FORMATTER.format(amount)
}
