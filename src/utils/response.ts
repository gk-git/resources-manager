export const jsonResponse = (data: any, status: number = 200) => {
  return {
    status: getStatusString(status),
    data,
  };
};
const getDigitCount = (number: number) => {
  return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
};
const getStatusString = number => {
  const location = getDigitCount(number) + 1;
  const status_index = Math.floor((number / Math.pow(10, location - 1)) % 10);

  switch (status_index) {
    case 1:
      return 'informational';
    case 2:
      return 'informational';
    case 3:
      return 'client error';
    case 4:
      return 'server error';
    default:
      return '';
  }
};
