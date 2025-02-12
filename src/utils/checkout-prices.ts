export const calcCheckoutPrice = (totalPrice: number = 0) => {
  const tax = (totalPrice * 0.05).toFixed(2);
  const delivery = 300;
  const total = (totalPrice + Number(tax) + delivery).toFixed(2);
  return { total, tax, delivery };
};
