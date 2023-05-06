

/* Add Peso sign and comma in price */
export const formatPrice = (price:number) => {
  const formattedNumber = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).replace(/^(\D+)/, '$1 ');

  return formattedNumber;
}