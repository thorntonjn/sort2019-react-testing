let CITIES = {}

export function isCity(name) {
  return !!CITIES[name];
}

export function initializeCityDatabase () {
    CITIES['Vienna'] = true
    CITIES['San Juan'] = true
}

export function clearCityDatabase () {
  CITIES = {}
}