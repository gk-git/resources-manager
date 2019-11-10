export class ErrorHandler extends Error {
  statusCode: Number;
  details: Array<any>;
  constructor(statusCode, message, details: Array<any> = []) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
export const handleError = (err, res) => {
  const { statusCode, message, details } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    details,
  });
};
