import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`

const ScrollHint = styled.h2`
  animation: ${bounce} 1.5s ease-in-out;
  animation-delay: 2s;
  bottom: 0;
  font-size: 72px;
  margin-bottom: 0;
  position: absolute;
  text-align: center;
  transform-origin: center bottom;

  span {
    display: block;
    font-size: 1rem;
    margin-bottom: 1em;
  }
`

function Hero({ forecast }) {
  const coldMessage = (
    <h2>
      {forecast.willItBeCold && !forecast.willItSnow && 'But it will be cold. '}
      Please consider{' '}
      <a
        href="https://www.coalitionforthehomeless.org/take-action/donate/"
        target="_blank"
        rel="noopener noreferrer"
      >
        donating to help NYC's homeless
      </a>
      .
    </h2>
  )

  const showColdMessage = forecast.willItBeCold || forecast.willItSnow

  return (
    <>
      <h1>{forecast && forecast.willItSnow ? 'YES' : 'No'}</h1>
      {showColdMessage && coldMessage}
      <ScrollHint>
        ↓<span>see forecast</span>
      </ScrollHint>
    </>
  )
}

export default Hero
