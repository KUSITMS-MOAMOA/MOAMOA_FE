import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(164, 176, 255, 0.2) 100%
  );
  text-align: center;
`;

export const Logo = styled.p`
  font-family: ${(props) => props.theme.fonts.montserratAlternatesBold};
  font-size: 2rem;
  font-weight: 700;
  top: 17.25rem;
  margin-bottom: 1.25rem;
  line-height: 2.5rem;
`;

export const LogoImage = styled.img`
  width: 11.25rem;
  height: 11.25rem;
  margin-bottom: 10rem;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: black;
  margin-bottom: 3.5rem;
  max-width: 17.5rem;
  line-height: 1.5;
  bottom: 8.0983rem;
`;

export const ButtonWrapper = styled.div`
  width: 19.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;
