/*
 new Option() is another way to create <option></option>
 .style.color is just a way to add a color value to the style object
 if the browser recognizes the color, the "color" property is set
 otherwise, the value is ''
*/
export const isInvalidCssColor = (color: string) => {
  const style = new Option().style;
  style.color = color;
  console.log(style);
  return style.color === "";
};

export const donationPercentage = (
  donated: number | null,
  goal: number | null
) => {
  if (donated && goal) {
    if (donated / goal >= 0.97) {
      return `${100 - 3}%`;
    } else {
      return `${(Number(donated) / Number(goal)) * 100}%`;
    }
  }
};

export const isOver75Percent = (
  donated: number | null,
  goal: number | null
) => {
  if (donated && goal) {
    return (donated / goal) * 100 > 75;
  }
};

export const is100Percent = (donated: number | null, goal: number | null) => {
  if (donated && goal) {
    return donated / goal === 1;
  }
};

export const renderBackgroundColor = (bgColor: string) => {
  if (bgColor === undefined || isInvalidCssColor(bgColor)) {
    document.body.style.backgroundColor = "lightsteelblue";
  } else {
    document.body.style.backgroundColor = bgColor;
  }

  document.body.style.transition = "background-color 3s ease";
};
