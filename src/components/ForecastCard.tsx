import dayjs from "dayjs";
import styled from "styled-components";
import type { DailyForecast } from "../types";

const Card = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.darkGray};
  display: flex;
  flex-direction: column;
  padding: 1em;
  text-align: center;

  h1 {
    font-size: 30px;
    font-weight: 300;
    margin-top: 0;
    text-transform: uppercase;
  }

  h2 {
    font-weight: 300;
    margin-bottom: 0;
  }
`;

const CardHeader = styled.div`
  margin: auto;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 1em auto 0 auto;
`;

const WeatherIcon = styled.img`
  height: 96px;
  margin: 0 auto;
  width: 96px;
`;

interface ForecastCardProps {
  forecast: DailyForecast;
}

function ForecastCard({ forecast }: ForecastCardProps) {
  const base = import.meta.env.BASE_URL;
  return (
    <Card>
      <CardHeader>
        <h1>{dayjs(forecast.date).format("ddd D")}</h1>
        <WeatherIcon
          src={`${base}images/${forecast.icon}.svg`}
          alt={forecast.icon}
        />
        <h2>Hi: {Math.ceil(forecast.temperatureMax)}° F</h2>
        <h2>Low: {Math.ceil(forecast.temperatureMin)}° F</h2>
        {forecast.snowfallInInches > 0 && (
          <h2>Snow: {forecast.snowfallInInches.toFixed(1)}"</h2>
        )}
      </CardHeader>
      <CardBody>
        <div>
          {forecast.willItSnow && (
            <img src={`${base}images/kermit-panic.gif`} alt="Kermit Panic" />
          )}
          {!forecast.willItSnow && (
            <img src={`${base}images/kermit-calm.gif`} alt="Kermit Calm" />
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default ForecastCard;
