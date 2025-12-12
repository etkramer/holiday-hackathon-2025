import styled from 'styled-components'
import ForecastCard from './ForecastCard'
import type { Forecast } from '../types'

const Grid = styled.section`
  background: ${props => props.theme.lightGray};
  color: ${props => props.theme.darkGray};
  display: grid;
  grid-row-gap: 1em;
  padding: 1em;

  @media (min-width: 480px) {
    grid-column-gap: 1em;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(7, 1fr);
  }
`

interface ForecastGridProps {
  forecast: Forecast
}

function ForecastGrid({ forecast }: ForecastGridProps) {
  return (
    <Grid>
      {forecast?.daily?.map(day => (
        <ForecastCard key={day.date} forecast={day} />
      ))}
    </Grid>
  )
}

export default ForecastGrid
