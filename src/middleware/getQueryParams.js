const { QUERY, HTTP_CODES } = require('../constants');

const getQueryParams = async (req, res, next) => {
  const { limit, page } = req.query;
  req.limit = parseInt(limit || QUERY.DEFAULT_LIMIT, 10);
  req.page = parseInt(page || QUERY.DEFAULT_PAGE, 10);

  if (req.limit > QUERY.MAX_LIMIT) return res.status(HTTP_CODES.BAD_REQUEST).end();
  return next();
};

module.exports = { getQueryParams };
