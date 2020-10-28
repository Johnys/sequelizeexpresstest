const { HTTP_CODES, HEADERS } = require('../../constants');
const { getProfile } = require('../getProfile');
const ProfileService = require('../../profile/service');

jest.mock('../../profile/service');

describe('getProfile', () => {
  let requestMock;
  let responseMock;
  let nextMock;

  beforeEach(() => {
    jest.resetAllMocks();

    requestMock = {
      get: jest.fn(),
    };

    responseMock = {
      status: jest.fn(),
      end: jest.fn(),
    };
    responseMock.status.mockReturnValue(responseMock);
    responseMock.end.mockReturnValue(responseMock);

    nextMock = jest.fn();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should populate profile and call next when profile_id header is right', async () => {
    const profile = { id: 1, firstName: 'Harry' };
    ProfileService.getById.mockResolvedValue(profile);
    requestMock.get.mockReturnValue(profile.id);

    await getProfile(requestMock, responseMock, nextMock);

    expect(requestMock.get).toBeCalledWith(HEADERS.PROFILE_ID);
    expect(requestMock.profile).toBe(profile);
    expect(nextMock).toBeCalledTimes(1);
  });

  it('should return status 401 when not find a profile', async () => {
    ProfileService.getById.mockResolvedValue(null);
    const profileId = 1;
    requestMock.get.mockReturnValue(profileId);

    await getProfile(requestMock, responseMock, nextMock);

    expect(responseMock.status).toBeCalledWith(HTTP_CODES.UNAUTHORIZED);
    expect(responseMock.end).toBeCalledTimes(1);
    expect(nextMock).not.toBeCalled();
  });

  it('should return status 401 when there is not profile_id header', async () => {
    ProfileService.getById.mockResolvedValue(null);
    requestMock.get.mockReturnValue(null);

    await getProfile(requestMock, responseMock, nextMock);

    expect(responseMock.status).toBeCalledWith(HTTP_CODES.UNAUTHORIZED);
    expect(responseMock.end).toBeCalledTimes(1);
    expect(nextMock).not.toBeCalled();
  });
});
