import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 13rem;
  padding: 0 1.25rem 1.25rem;
  color: ${Colors.gray900};
  background-image: url('/images/HomeImage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${(props) => props.theme.breakpoints.min} {
    height: 100%;
    padding: 0rem;
    background: none;
  }
`;

export const Title = styled.h3`
  margin-top: 3.75rem;
  line-height: 135%;

  ${(props) => props.theme.breakpoints.min} {
    margin-top: 0rem;
    font-size: 1.625rem;
  }
`;

export const SheetContainer = styled.div`
  display: none;

  ${(props) => props.theme.breakpoints.min} {
    display: flex;
    gap: 1.25rem;
    margin-top: 1.25rem;
  }
`;
