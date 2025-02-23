import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Chip = styled.div<{ size: string; $color?: boolean }>`
  width: fit-content;
  padding: ${(props) => (props.size === 'large' ? '0.25rem 0.875rem' : '0.125rem 0.375rem')};
  border-radius: 0.25rem;
  background-color: ${(props) => (props.$color ? Colors.gray25 : Colors.blue50)};
  color: ${Colors.gray900};
  font-size: ${(props) => (props.size === 'large' ? '0.875rem' : '0.75rem')};
  font-weight: ${(props) => (props.size === 'large' ? '600' : '400')};
  line-height: 145%;

  ${(props) => props.theme.breakpoints.min} {
    font-size: ${(props) => (props.size === 'large' ? '0.875rem' : '1rem')};
  }
`;
