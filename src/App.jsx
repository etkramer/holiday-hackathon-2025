import { useState, useEffect } from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import ForecastGrid from './components/ForecastGrid'
import Footer from './components/Footer'
import Hero from './components/Hero'

const spin = keyframes`
  25% { transform: rotate(90deg) }
  50% { transform: rotate(180deg) }
  75% { transform: rotate(270deg) }
  100% { transform: rotate(360deg) }
`

const Spinner = styled.div`
  animation: ${spin} 1.5s linear infinite;
  border-radius: 50%;
  border: 10px solid white;
  border-top-color: transparent;
  height: 100px;
  width: 100px;
`

const Main = styled.main`
  align-items: center;
  background: ${props => props.theme.darkGray};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 0 1em;
  text-align: center;
  transition: background 1s linear;

  &.green {
    background: green;
  }

  &.red {
    background: red;
  }

  h1 {
    font-family: 'Noto Serif TC', serif;
    font-size: 72px;
    margin: 0;
    text-align: center;

    @media (min-width: 600px) {
      font-size: 96px;
    }

    @media (min-width: 1024px) {
      font-size: 144px;
    }
  }

  a {
    color: white;
  }
`

const theme = {
  lightGray: '#eeeeee',
  darkGray: '#979797'
}

// NYC coordinates: 40.7128, -74.0060
const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&daily=temperature_2m_max,temperature_2m_min,snowfall_sum,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York'

async function fetchForecast() {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    // Transform to match expected format
    const daily = data.daily.time.map((date, i) => ({
      date,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      snowfallInInches: data.daily.snowfall_sum[i] / 2.54, // cm to inches
      weatherCode: data.daily.weather_code[i],
      icon: getWeatherIcon(data.daily.weather_code[i]),
      willItSnow: data.daily.snowfall_sum[i] > 0
    }))

    const willItSnow = daily.some(d => d.willItSnow)
    const willItBeCold = daily.some(d => d.temperatureMin < 32)

    return { daily, willItSnow, willItBeCold }
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}

function getWeatherIcon(code) {
  // WMO Weather interpretation codes
  // https://open-meteo.com/en/docs
  if (code === 0) return 'clear-day'
  if (code === 1 || code === 2) return 'partly-cloudy-day'
  if (code === 3) return 'cloudy'
  if (code >= 45 && code <= 48) return 'fog'
  if (code >= 51 && code <= 55) return 'drizzle'
  if (code >= 56 && code <= 57) return 'sleet'
  if (code >= 61 && code <= 65) return 'rain'
  if (code >= 66 && code <= 67) return 'sleet'
  if (code >= 71 && code <= 77) return 'snow'
  if (code >= 80 && code <= 82) return 'rain'
  if (code >= 85 && code <= 86) return 'snow'
  if (code >= 95 && code <= 99) return 'thunderstorm'
  return 'cloudy'
}

function App() {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchForecast().then(data => {
      setForecast(data)
      setLoading(false)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Main>
          <Spinner />
        </Main>
      ) : forecast ? (
        <>
          <Main className={forecast.willItSnow ? 'red' : 'green'}>
            <Hero forecast={forecast} />
          </Main>
          <ForecastGrid forecast={forecast} />
          <Footer />
        </>
      ) : null}
    </ThemeProvider>
  )
}

export default App
