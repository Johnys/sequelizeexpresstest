const { HTTP_CODES, HEADERS } = require('../constants');
const ProfileService = require('../profile/service');

const getProfile = async (req, res, next) => {
  const profileId = req.get(HEADERS.PROFILE_ID);

  let profile;
  if (profileId) profile = await ProfileService.getById(profileId);

  if (!profile) return res.status(HTTP_CODES.UNAUTHORIZED).end();

  req.profile = profile;
  return next();
};
module.exports = { getProfile };
