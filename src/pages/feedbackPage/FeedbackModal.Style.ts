import { Colors } from '@/styles/colors';
import styled from 'styled-components';
import { Button } from '../../components/common/button/Button';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.h5`
  color: ${Colors.gray700};
  white-space: pre-line;
  font-size: 17px;
  text-align: left;
  width: 100%;
  margin-left: 1rem;
  padding-bottom: 1.2rem;
  line-height: 0.8;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

export const StyledButton = styled(Button)`
  color: ${Colors.gray600};
`;

export const Icon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

export const Image = styled.img`
  margin-left: auto;
  vertical-align: middle;
  margin-top: -1.5rem;
`;