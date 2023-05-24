export const emiStatus = async (investment) => {
  let emiStatus = [];

  if (investment.transactions === null) {
    return null;
  }
  for (let month = 1; month <= investment.emiDuration; month++) {
    let dueDate = new Date(
      investment.createdAt.getTime() + 30 * (month - 1) * 24 * 60 * 60 * 1000
    );

    if (
      investment.transactions[month - 1] === undefined ||
      investment.transactions[month - 1].status !== "success"
    ) {
      emiStatus.push({
        month: month,
        amount: Math.ceil(investment.amount / investment.emiDuration),
        status: "pending",
        createdAt: null,
        dueDate,
      });
      continue;
    }

    if (
      investment.transactions[month - 1].month === month &&
      investment.transactions[month - 1].status === "success"
    ) {
      emiStatus.push({
        month: investment.transactions[month - 1].month,
        amount: Math.ceil(investment.amount / investment.emiDuration),
        status: investment.transactions[month - 1].status,
        createdAt: investment.transactions[month - 1].createdAt,
        dueDate,
      });
    }
  }
  return emiStatus;
};
