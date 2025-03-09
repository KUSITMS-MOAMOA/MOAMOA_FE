import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0rem 1.25rem 0rem 1.5rem;
  gap: 1rem;
  width: 100%;
  background-color: ${Colors.white};
  border-bottom: 1px solid ${Colors.gray50};

  ${(props) => props.theme.breakpoints.min} {
    background-color: ${Colors.gray25};
    padding: 3.25rem 4.75rem 0rem;
  }
`;

export const Content = styled.div`
  padding: 0rem 0.25rem;
  color: ${Colors.gray900};
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 135%;

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.75rem;
    line-height: 140%;
  }
`;

export const Description = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 135%;
  margin-top: 0.4375rem;
`;

export const TabBar = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
`;

export const Item = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  color: ${({ $isSelected }) => ($isSelected ? Colors.gray700 : '#767676')};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 140%;
  padding: 0.5rem 0rem;
  border-bottom: ${({ $isSelected }) => ($isSelected ? `2px solid ${Colors.gray700}` : 'none')};

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.25rem;
    line-height: 135%;
  }
`;

export const Image = styled.img`
  position: absolute;
  top: 16px;
  right: 20px;
`;
