import * as HttpStatus from 'http-status-codes';

export const jsonResponse = (data: any, statusCode: number = 200) => {
  return {
    status: {
      text: HttpStatus.getStatusText(statusCode),
      code: statusCode,
    },
    data,
  };
};
