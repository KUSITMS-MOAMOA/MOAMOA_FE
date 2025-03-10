import styled from 'styled-components';

interface SignUpPageStyleProps {
  $isPC: boolean;
}

export const PageContainer = styled.div<SignUpPageStyleProps>`
  display: flex;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Container = styled.div<SignUpPageStyleProps>`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3.75rem);
  padding: 0 1.25rem;
  width: 100%;
  max-width: 100%;

  ${(props) => props.theme.breakpoints.min} {
    width: 30rem;
  }
`;

export const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem 0;
  text-align: left;
  width: 100%;
`;

export const InputWrapper = styled.div<SignUpPageStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.625rem;
  line-height: 1.575rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
`;