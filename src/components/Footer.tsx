import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: ${(props) => props.theme.lightGray};
  color: ${(props) => props.theme.darkGray};
  padding: 1em;
  text-align: center;

  a {
    color: black;
  }

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    > p {
      width: 50%;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>
        Created by{" "}
        <a
          href="https://github.com/etkramer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Eli Kramer
        </a>
      </p>
      <p>
        Inspired by{" "}
        <a
          href="https://www.willitsnowinpdx.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Will It Snow in PDX?
        </a>
      </p>
      <p>
        Icons ©{" "}
        <a
          href="https://www.iconfinder.com/iconsets/weather-line-19"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fatkhul Karim
        </a>{" "}
        under Creative Commons 3.0
      </p>
      <p>
        Forecast provided by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-Meteo
        </a>
      </p>
    </FooterWrapper>
  );
}

export default Footer;
