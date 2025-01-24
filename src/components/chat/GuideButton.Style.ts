import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const GuideButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const GuideButton = styled.button`
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${Colors.white};
  border-radius: 6.1875rem;
  border: 1px solid ${Colors.gray50};
  max-width: 18.75rem;
  margin-bottom: 0.625rem;
  margin-left: 0.625rem;
  cursor: pointer;
`;

export const GuideText = styled.p`
  font-size: 0.875rem;
  color: ${Colors.gray900};
  font-weight: 400;
  margin: 0;
  line-height: 1.25rem;
`;
