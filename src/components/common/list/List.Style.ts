import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const List = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  color: ${Colors.gray900};
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${Colors.white};
  cursor: pointer;

  ${(props) => props.theme.breakpoints.min} {
    height: 8.8125rem;
  }
`;

export const ChipContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.375rem;
`;

export const Title = styled.h5`
  line-height: 140%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  margin-bottom: 0.375rem;

  ${(props) => props.theme.breakpoints.min} {
    line-height: 135%;
  }
`;

export const DateText = styled.p`
  font-size: 0.8125rem;
  line-height: 145%;
`;

export const bottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
