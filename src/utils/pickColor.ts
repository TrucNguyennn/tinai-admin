const pickColor = (num: number): string => {
  const remainder = num % 7;
  switch (remainder) {
    case 0:
      return `blue`;
    case 1:
      return `cyan`;
    case 2:
      return `magenta`;
    case 3:
      return `green`;
    case 4:
      return `orange`;
    case 5:
      return `pink`;
    case 6:
      return `purple`;
    default:
      return `lime`;
  }
};

export default pickColor;
