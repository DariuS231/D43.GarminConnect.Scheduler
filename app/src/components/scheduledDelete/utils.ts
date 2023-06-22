export const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString(undefined, { month: "long" });
};
