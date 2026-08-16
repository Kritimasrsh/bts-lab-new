/* ---- Repair order workflow status ---- */
export const ORDER_STATUSES = [
  "RECEIVED",
  "IN_PROGRESS",
  "READY",
  "DELIVERED",
  "CANCELLED",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  RECEIVED: "Received",
  IN_PROGRESS: "In progress",
  READY: "Ready",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_STYLE: Record<OrderStatus, string> = {
  RECEIVED: "bg-brand/10 text-brand",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  READY: "bg-sky-100 text-sky-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-600",
};

/* ---- Preferred payment method ---- */
export const PAYMENT_METHODS = ["CASH", "CHEQUE", "CREDIT"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  CASH: "Cash",
  CHEQUE: "Cheque",
  CREDIT: "Credit",
};

/* ---- Payment / settlement status ---- */
export const PAYMENT_STATUSES = ["UNPAID", "PARTIAL", "PAID"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  UNPAID: "Unpaid",
  PARTIAL: "Partial",
  PAID: "Paid",
};

export const PAYMENT_STATUS_STYLE: Record<PaymentStatus, string> = {
  UNPAID: "bg-red-100 text-red-600",
  PARTIAL: "bg-amber-100 text-amber-700",
  PAID: "bg-emerald-100 text-emerald-700",
};

/* ---- Order source (partner shop vs walk-in customer) ---- */
export const SOURCES = ["SHOP", "DIRECT"] as const;
export type OrderSource = (typeof SOURCES)[number];

export const SOURCE_LABEL: Record<OrderSource, string> = {
  SHOP: "Partner shop",
  DIRECT: "Direct customer",
};

/** Rupee formatter (whole rupees). */
export function rs(n?: number | null) {
  if (n == null) return "—";
  return `Rs ${new Intl.NumberFormat("en-IN").format(n)}`;
}
