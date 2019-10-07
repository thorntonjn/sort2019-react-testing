let CITIES = {
  "Vienna": true,
  "San Juan": true,
  "Rome": true,
}

export default function threadSafeIsCity(name) {
  return Promise.resolve(!!CITIES[name]);
}
