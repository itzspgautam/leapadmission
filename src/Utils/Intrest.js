export const getprofitIntrest = async (investment) => {
  if (investment.transactions === null) {
    return null;
  }

  let info = {
    totalPaid: 0,
    totalIntrest: 0,
    totalDue: 0,
    daysLeft: 0,
    percentage: 0,
  };

  //Calculate Days Left
  const currentDate = new Date(Date.now());
  const endDate = new Date(
    investment.createdAt.getTime() +
      30 * investment.duration * 24 * 60 * 60 * 1000 +
      5 * 24 * 60 * 60 * 1000
  );
  const timeDiff = endDate - new Date(currentDate);
  info.daysLeft =
    Math.ceil(timeDiff / (1000 * 3600 * 24)) < 0
      ? 0
      : Math.ceil(timeDiff / (1000 * 3600 * 24));

  //Calculate Percentage
  let percnt = Math.round(
    ((new Date() - new Date(investment.createdAt)) /
      (investment.duration * 30.44 * 24 * 60 * 60 * 1000)) *
      100
  );
  info.percentage = percnt > 100 ? 100 : percnt;

  //Calculate Totoal Paid
  investment.transactions.map((trn) => {
    if (trn.status === "success") {
      info.totalPaid += trn.amount;
    }
  });

  //Calculate Total intrest after Invest Duration
  info.totalIntrest =
    ((investment.intrest * (investment.duration / 12)) / 100) *
    investment.amount;

  info.totalDue = investment.amount - info.totalPaid;
  return info;
};
