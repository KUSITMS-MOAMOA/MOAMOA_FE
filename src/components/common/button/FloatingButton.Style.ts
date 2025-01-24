import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Button = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 1.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.blue400};
  box-shadow: 0px 0px 8px 0px rgba(251, 247, 195, 0.6) inset;
  border-radius: 6.1875rem;
  border: none;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.min} {
    display: none;
  }
`;

export const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
