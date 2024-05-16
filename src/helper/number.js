export const normalizeUserBalance = (userBalance) => {
  console.log(userBalance, "<<<< userBalance");
  if (!userBalance) return 0;

  return Object.fromEntries(
    Object.entries(userBalance).map(([key, value]) => {
      const converterdValue = Number(value);
      return [
        key,
        parseFloat(converterdValue / 10 ** 8)
          .toFixed(5)
          .toLocaleString(),
      ];
    })
  );
};
