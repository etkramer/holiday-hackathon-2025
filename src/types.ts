export interface DailyForecast {
  date: string
  temperatureMax: number
  temperatureMin: number
  snowfallInInches: number
  weatherCode: number
  icon: string
  willItSnow: boolean
}

export interface Forecast {
  daily: DailyForecast[]
  willItSnow: boolean
  willItBeCold: boolean
}

export interface Theme {
  lightGray: string
  darkGray: string
}
