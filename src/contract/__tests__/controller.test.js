const ContractController = require('../controller');
const ContractService = require('../service');
const { HTTP_CODES } = require('../../constants');

jest.mock('../service');

describe(ContractController, () => {
  let responseMock;

  beforeEach(() => {
    jest.resetAllMocks();

    responseMock = {
      status: jest.fn(),
      end: jest.fn(),
      json: jest.fn(),
    };
    responseMock.status.mockReturnValue(responseMock);
    responseMock.end.mockReturnValue(responseMock);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return contract by id', async () => {
    const contract = { id: 1 };
    ContractService.getContractByIdAndProfile.mockResolvedValue(contract);
    const requestMock = { params: { id: 1 }, profile: { id: 1 } };

    await ContractController.getById(requestMock, responseMock);

    expect(responseMock.json).toBeCalledWith(contract);
  });

  it('should return 404 when contract is not found', async () => {
    ContractService.getContractByIdAndProfile.mockResolvedValue(null);
    const requestMock = { params: { id: 1 }, profile: { id: 1 } };

    await ContractController.getById(requestMock, responseMock);

    expect(responseMock.json).not.toBeCalled();
    expect(responseMock.status).toBeCalledWith(HTTP_CODES.NOT_FOUND);
    expect(responseMock.end).toBeCalledTimes(1);
  });
});
