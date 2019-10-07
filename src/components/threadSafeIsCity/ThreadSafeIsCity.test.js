import threadSafeIsCity from "./ThreadSafeIsCity";

describe('ThreadSafeIsCity', () => {
  test.concurrent('CityDatabase has Vienna', async () => {
    expect(await threadSafeIsCity('Vienna')).toBeTruthy();
  })

  it.concurrent('should have San Juan', async () => {
    expect(await threadSafeIsCity('San Juan')).toBeTruthy();
  })

  it.concurrent('should have Rome', async() => {
    expect(await threadSafeIsCity('Rome')).toBeTruthy();
  })

  it.concurrent('should not have Salt Lake City', async() => {
    expect(await threadSafeIsCity('Salt Lake City')).toBe(false);
  })

})