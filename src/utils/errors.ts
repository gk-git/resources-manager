import * as HttpStatus from 'http-status-codes';
export class ErrorHandler extends Error {
  statusCode: Number;
  details: Array<any>;
  constructor(
    statusCode: Number = 500,
    message: any,
    details: Array<any> = [],
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export const handleError = (err, res) => {
  const { message, details } = err;
  let statusCode = 500;
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    status: {
      text: HttpStatus.getStatusText(statusCode),
      code: statusCode,
    },
    message,
    details,
  });
};
