export const FREE_DELIVERY_LIMIT = 500;
export const DELIVERY_FEE = 40;
export const TAX_RATE = 0.05;

export type PricedItem = {
  price: number;
  quantity: number;
};

export function calculateOrderTotals(items: PricedItem[]) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryFee + tax;

  return { subtotal, deliveryFee, tax, total };
}
