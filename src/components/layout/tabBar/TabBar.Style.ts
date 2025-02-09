import { Colors } from '@/styles/colors';
import styled, { css } from 'styled-components';

interface TextProps {
  $isDisabled?: boolean;
  $isChat?: boolean;
}

export const TabBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.375rem;
  width: 100%;
  padding: 0rem 1.25rem;
  background-color: ${Colors.white};
  border-bottom: 1px solid ${Colors.gray50};
  z-index: 1000;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;
export const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const CenterText = styled.h6`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${Colors.gray900};
  line-height: 140%;
`;

export const Text = styled.p<TextProps>`
  font-size: 0.875rem;
  line-height: 145%;
  color: ${({ $isDisabled, $isChat }) =>
    $isDisabled ? Colors.gray300 : $isChat ? '#F05561' : Colors.gray700};
  ${({ $isChat }) =>
    $isChat &&
    css`
      padding: 0.25rem 0.625rem;
      background-color: #fdeaec;
      border-radius: 0.5rem;
    `}
  cursor: pointer;
`;

export const LeftText = styled.h5`
  position: absolute;
  top: 0.875rem;
  left: 4rem;
  line-height: 140%;
`;
