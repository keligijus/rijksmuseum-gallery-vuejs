export const generatePeriods = () => {
  function nth(n) {
    return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
  }

  const periods = Array(22)
    .fill()
    .map((_item, index) => {
      return { value: index, name: index + nth(index) };
    })
    .filter((_item, index) => {
      // remove periods without results
      return index >= 13 && index < 21;
    });

  periods.unshift({ value: "all", name: "All" });

  return periods;
};
