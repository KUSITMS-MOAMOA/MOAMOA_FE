import { Colors } from '@/styles/colors';
import styled from 'styled-components';


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.h5`
  color: ${Colors.gray900};
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

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer; 
  border-radius: 0.625rem;
  width: 100%;
  margin: 1.25rem 0.875rem;

  &:hover {
    background-color: ${Colors.gray50}; 
  }
  &:active {
    background-color: ${Colors.gray50};
  }

  img {
    width: 6.25rem;
    height: 6.25rem;
  }
`;

export const ButtonText = styled.h4`
  margin: 0.5rem;
  color: ${Colors.gray600};
  font-size: 15px;
  white-space: pre-line;
`

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