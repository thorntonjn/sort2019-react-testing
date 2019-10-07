import ImplementationToMock from './ImplementationToMock'

jest.mock('./ImplementationToMock'); // this happens automatically with automocking

describe('MockImplementation', () => {
  it ('should mock the implementation to always return 42', () => {
    ImplementationToMock.mockImplementation(() => 42);
    expect(ImplementationToMock()).toBe(42)
  })

  it ('should mock a more complex behavior', () => {
    const myMockFn = ImplementationToMock
        .mockImplementationOnce(cb => cb(null, true))
        .mockImplementationOnce(cb => cb(null, false));
    const mockCB = jest.fn()
    myMockFn(mockCB);
    expect(mockCB.mock.calls[0]).toEqual([null, true])
    myMockFn(mockCB);
    expect(mockCB.mock.calls[1]).toEqual([null, false])
  })

  it ('should fallback to default implementation when mocked function run out', () => {
    const myMockFn = jest
        .fn(() => 'default')
        .mockImplementationOnce(() => 'first call')
        .mockImplementationOnce(() => 'second call');
    expect(myMockFn()).toBe('first call')
    expect(myMockFn()).toBe('second call')
    expect(myMockFn()).toBe('default')
    expect(myMockFn()).toBe('default')
  })

})
