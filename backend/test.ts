const getDigitCount = (number: number) => {
  return Math.max(Math.floor(Math.log10(Math.abs(number))), 0);
};
const getStatusString = number => {
  const location = getDigitCount(number) + 1; //?
  const x = (number / Math.pow(10, location - 1)) % 10; //?
  const status_index = Math.floor((number / Math.pow(10, location - 1)) % 10); //?
  console.log('location', location);
  switch (status_index) {
    case 1:
      return 'informational';
    case 2:
      return 'success';
    case 3:
      return 'redirection';
    case 4:
      return 'client error';
    case 5:
      return 'server error';
    default:
      return 'not handled';
  }
};

getStatusString(300); //?
