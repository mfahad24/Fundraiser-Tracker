const donationPercentage = (donated: string, goal: string) => {
  if (Number(donated) / Number(goal) >= 1) {
    return `${100 - 3}%`;
  } else {
    return `${(Number(donated) / Number(goal)) * 100}%`;
  }
};

export default donationPercentage;
