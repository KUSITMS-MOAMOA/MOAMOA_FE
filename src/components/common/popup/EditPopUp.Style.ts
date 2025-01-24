import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const CloseIcon = styled.img`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.min} {
    position: absolute;
    top: 1.5rem;
    right: 1.0625rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.3125rem;
  margin-bottom: 1.25rem;

  ${(props) => props.theme.breakpoints.min} {
    gap: 0rem;
    margin-bottom: 0rem;
  }
`;

export const SheetItem = styled.div<{ $isDelete?: boolean }>`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  color: ${({ $isDelete }) => ($isDelete ? Colors.red : '#1d1d1d')};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.25rem;
    gap: 1rem;
    padding: 0.625rem;
  }
`;

export const Icon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

export const PopUp = styled.div`
  position: absolute;
  top: 8.125rem;
  right: 4.75rem;
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.gray100};
  padding: 1.875rem 3.375rem 1.875rem 2.25rem;
  z-index: 10;
  background-color: ${Colors.white};
  border-radius: 0.75rem;
`;
