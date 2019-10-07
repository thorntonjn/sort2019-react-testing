import {isCity, initializeCityDatabase, clearCityDatabase} from "./CityDatabase";

describe('CityDatabase', () => {
  beforeEach( () => {
    initializeCityDatabase()
  })

  afterEach( () => {
    clearCityDatabase()
  })

  test('CityDatabase has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  })

  it('should have San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
  })

})