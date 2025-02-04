import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  height: calc(100vh - 13em);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 1.25rem 1.25rem;
  background-color: ${Colors.gray25};
  color: ${Colors.gray900};

  ${(props) => props.theme.breakpoints.min} {
    padding: 0rem;
    border-radius: 0rem;
    gap: 0.75rem;
    height: auto;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.h5`
  line-height: 140%;

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.25rem;
  }
`;

export const Plus = styled.p`
  font-size: 0.75rem;
  line-height: 145%;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.125rem;
  }
`;

export const ListContainer = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
  overflow-y: auto;
  flex-grow: 1;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) => props.theme.breakpoints.min} {
    ${(props) =>
      !props.$isEmpty &&
      `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    `}
  }
`;
