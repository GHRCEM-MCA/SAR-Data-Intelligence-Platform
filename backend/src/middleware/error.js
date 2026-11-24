const env = require('../config/env');

exports.notFound = (req, _res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, _req, res, _next) => {
  let status = err.status || 500;
  let message = err.message;

  // Postgres error codes
  if (err.code === '23505') { status = 409; message = 'A record with these details already exists.'; }
  else if (err.code === '23503') { status = 400; message = 'Referenced record does not exist or is still in use.'; }
  else if (err.code === '23514' || err.code === '22P02') { status = 400; message = 'Invalid value supplied.'; }
  else if (err.type === 'entity.parse.failed') { status = 400; message = 'Malformed JSON body.'; }

  if (status >= 500) console.error(err);
  res.status(status).json({
    success: false,
    message: status >= 500 && env.isProd ? 'Internal server error.' : message,
    ...(err.details ? { details: err.details } : {}),
  });
};
