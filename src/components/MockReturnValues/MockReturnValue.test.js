describe('Mock Return Values', () => {
  it ('should initialize to undefined', () => {
    const myMock = jest.fn();
    expect(myMock()).toBeUndefined();
  })

  it ('should return Mocked values in order', () => {
    const myMock = jest.fn()
      .mockReturnValueOnce(10)
      .mockReturnValueOnce('x')
      .mockReturnValue(true);
    expect(myMock()).toBe(10)
    expect(myMock()).toBe('x')
    expect(myMock()).toBe(true)
  })

  it ('should return true for first value and false for second', () => {
    const filterTestFn = jest.fn();

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
    expect([11, 12].filter(filterTestFn)).toEqual([11]);
    expect(filterTestFn.mock.calls[0][0]).toBe(11)
    expect(filterTestFn.mock.calls[1][0]).toBe(12)
  })
})


