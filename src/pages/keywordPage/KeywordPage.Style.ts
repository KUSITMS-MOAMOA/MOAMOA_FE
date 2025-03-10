import { Colors } from '@/styles/colors';
import styled from 'styled-components';

interface ContainerProps {
  $isEmpty: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 5rem;
  background-color: ${({ $isEmpty }) => $isEmpty ? Colors.gray25 : Colors.white};
  overflow-x: hidden;

  ${(props) => props.theme.breakpoints.min} {
    flex-direction: row;
    background-color: ${Colors.gray25};
    padding-top: 1.5rem;
    height: calc(100vh - 13.125rem);
  }
`;

export const Content = styled.div`
  ${props => props.theme.breakpoints.min} {
    display: flex;
    flex-direction: row;
    width: 900px;
    height: 100%;
    min-height: 450px;
    background-color: ${Colors.white};
    align-items: center;
    border-radius: 20px;
    padding: 1rem;
  }
  margin-top: 3rem;
  bottom: 10rem;
`;

export const EmptyContainer = styled.div`
  width: 100%;
  height: calc(100vh - 20rem);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
`;